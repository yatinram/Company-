'use strict';

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const path = require('path');

const authMiddleware = require('../middleware/auth');
const {
  uploadProductImages,
  uploadTestimonialPhoto,
  uploadPortfolioImage,
  uploadMisc,
} = require('../middleware/upload');
const jwtConfig = require('../config/jwt');
const {
  AdminUser,
  Service,
  Product,
  PortfolioItem,
  Testimonial,
  CompanySettings,
  ContactSubmission,
} = require('../models');

const router = express.Router();

// ─── Helpers ──────────────────────────────────────────────────────────────────

const handleValidationErrors = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, errors: errors.array() });
  }
  return null;
};

/** Builds a public URL for an uploaded file from req.file or req.files */
const buildFileUrl = (req, relativePath) => {
  if (!relativePath) return null;
  // Return a relative URL path that will be served as a static file
  return `/uploads/${relativePath.replace(/\\/g, '/')}`;
};

const getFileRelativePath = (file) => {
  if (!file) return null;
  // e.g. uploads/products/16234567890-123456789.jpg  → products/16234567890-123456789.jpg
  const uploadsIndex = file.path.replace(/\\/g, '/').indexOf('uploads/');
  if (uploadsIndex === -1) return file.filename;
  return file.path.replace(/\\/g, '/').slice(uploadsIndex + 'uploads/'.length);
};

// ─── Authentication ───────────────────────────────────────────────────────────

/**
 * POST /api/admin/login
 * Accepts email + password, returns a signed JWT on success.
 */
router.post(
  '/login',
  [
    body('email').trim().isEmail().withMessage('Valid email is required.'),
    body('password').notEmpty().withMessage('Password is required.'),
  ],
  async (req, res) => {
    const validationError = handleValidationErrors(req, res);
    if (validationError !== null) return;

    try {
      const { email, password } = req.body;

      const admin = await AdminUser.findOne({ where: { email: email.toLowerCase() } });
      if (!admin) {
        return res.status(401).json({ success: false, message: 'Invalid email or password.' });
      }

      const isMatch = await bcrypt.compare(password, admin.password_hash);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid email or password.' });
      }

      const payload = { id: admin.id, email: admin.email };
      const token = jwt.sign(payload, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });

      return res.json({
        success: true,
        message: 'Login successful.',
        token,
        admin: { id: admin.id, email: admin.email },
      });
    } catch (err) {
      console.error('POST /admin/login error:', err);
      return res.status(500).json({ success: false, message: 'Server error during login.' });
    }
  }
);

// ─── All routes below require JWT auth ────────────────────────────────────────
router.use(authMiddleware);

// ─── Dashboard ────────────────────────────────────────────────────────────────

/**
 * GET /api/admin/dashboard
 * Returns record counts for main resources.
 */
router.get('/dashboard', async (req, res) => {
  try {
    const [services, products, portfolio, testimonials, contacts] = await Promise.all([
      Service.count(),
      Product.count(),
      PortfolioItem.count(),
      Testimonial.count(),
      ContactSubmission.count(),
    ]);
    return res.json({
      success: true,
      data: { services, products, portfolio, testimonials, contacts },
    });
  } catch (err) {
    console.error('GET /admin/dashboard error:', err);
    return res.status(500).json({ success: false, message: 'Server error fetching dashboard data.' });
  }
});

// ─── Services CRUD ────────────────────────────────────────────────────────────

router.get('/services', async (req, res) => {
  try {
    const services = await Service.findAll({ order: [['display_order', 'ASC']] });
    return res.json({ success: true, data: services });
  } catch (err) {
    console.error('GET /admin/services error:', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.get('/services/:id', async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) return res.status(404).json({ success: false, message: 'Service not found.' });
    return res.json({ success: true, data: service });
  } catch (err) {
    console.error('GET /admin/services/:id error:', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.post(
  '/services',
  [
    body('title').trim().notEmpty().withMessage('Title is required.'),
    body('description').trim().notEmpty().withMessage('Description is required.'),
    body('display_order').optional().isInt({ min: 0 }).withMessage('display_order must be a non-negative integer.'),
  ],
  async (req, res) => {
    const validationError = handleValidationErrors(req, res);
    if (validationError !== null) return;
    try {
      const { title, description, icon, display_order } = req.body;
      const service = await Service.create({
        title,
        description,
        icon: icon || null,
        display_order: display_order !== undefined ? parseInt(display_order, 10) : 0,
      });
      return res.status(201).json({ success: true, message: 'Service created.', data: service });
    } catch (err) {
      console.error('POST /admin/services error:', err);
      return res.status(500).json({ success: false, message: 'Server error creating service.' });
    }
  }
);

router.put(
  '/services/:id',
  [
    body('title').optional().trim().notEmpty().withMessage('Title cannot be empty.'),
    body('description').optional().trim().notEmpty().withMessage('Description cannot be empty.'),
    body('display_order').optional().isInt({ min: 0 }).withMessage('display_order must be a non-negative integer.'),
  ],
  async (req, res) => {
    const validationError = handleValidationErrors(req, res);
    if (validationError !== null) return;
    try {
      const service = await Service.findByPk(req.params.id);
      if (!service) return res.status(404).json({ success: false, message: 'Service not found.' });

      const { title, description, icon, display_order } = req.body;
      await service.update({
        title: title !== undefined ? title : service.title,
        description: description !== undefined ? description : service.description,
        icon: icon !== undefined ? icon : service.icon,
        display_order: display_order !== undefined ? parseInt(display_order, 10) : service.display_order,
      });
      return res.json({ success: true, message: 'Service updated.', data: service });
    } catch (err) {
      console.error('PUT /admin/services/:id error:', err);
      return res.status(500).json({ success: false, message: 'Server error updating service.' });
    }
  }
);

router.delete('/services/:id', async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) return res.status(404).json({ success: false, message: 'Service not found.' });
    await service.destroy();
    return res.json({ success: true, message: 'Service deleted.' });
  } catch (err) {
    console.error('DELETE /admin/services/:id error:', err);
    return res.status(500).json({ success: false, message: 'Server error deleting service.' });
  }
});

// ─── Products CRUD ────────────────────────────────────────────────────────────

router.get('/products', async (req, res) => {
  try {
    const products = await Product.findAll({ order: [['createdAt', 'ASC']] });
    return res.json({ success: true, data: products });
  } catch (err) {
    console.error('GET /admin/products error:', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found.' });
    return res.json({ success: true, data: product });
  } catch (err) {
    console.error('GET /admin/products/:id error:', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.post('/products', (req, res, next) => {
  uploadProductImages(req, res, async (uploadErr) => {
    if (uploadErr) {
      return res.status(400).json({ success: false, message: uploadErr.message });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ success: false, errors: errors.array() });
    }

    try {
      const { name, slug, description, features, modules } = req.body;

      if (!name || !slug || !description) {
        return res.status(422).json({ success: false, message: 'name, slug, and description are required.' });
      }

      // Parse JSON strings if sent as form-data
      const parsedFeatures = typeof features === 'string' ? JSON.parse(features) : (features || []);
      const parsedModules = typeof modules === 'string' ? JSON.parse(modules) : (modules || []);

      // Build image URL list from uploaded files
      const uploadedImages = (req.files || []).map((file) => `/uploads/${getFileRelativePath(file)}`);

      const product = await Product.create({
        name,
        slug,
        description,
        features: parsedFeatures,
        modules: parsedModules,
        images: uploadedImages,
      });
      return res.status(201).json({ success: true, message: 'Product created.', data: product });
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({ success: false, message: 'A product with this slug already exists.' });
      }
      console.error('POST /admin/products error:', err);
      return res.status(500).json({ success: false, message: 'Server error creating product.' });
    }
  });
});

router.put('/products/:id', (req, res, next) => {
  uploadProductImages(req, res, async (uploadErr) => {
    if (uploadErr) {
      return res.status(400).json({ success: false, message: uploadErr.message });
    }
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) return res.status(404).json({ success: false, message: 'Product not found.' });

      const { name, slug, description, features, modules, existing_images } = req.body;

      const parsedFeatures = features !== undefined
        ? (typeof features === 'string' ? JSON.parse(features) : features)
        : product.features;
      const parsedModules = modules !== undefined
        ? (typeof modules === 'string' ? JSON.parse(modules) : modules)
        : product.modules;

      // Merge existing images (kept by admin) with newly uploaded ones
      const keptImages = existing_images !== undefined
        ? (typeof existing_images === 'string' ? JSON.parse(existing_images) : existing_images)
        : product.images;
      const newImages = (req.files || []).map((file) => `/uploads/${getFileRelativePath(file)}`);
      const mergedImages = [...(keptImages || []), ...newImages];

      await product.update({
        name: name !== undefined ? name : product.name,
        slug: slug !== undefined ? slug : product.slug,
        description: description !== undefined ? description : product.description,
        features: parsedFeatures,
        modules: parsedModules,
        images: mergedImages,
      });
      return res.json({ success: true, message: 'Product updated.', data: product });
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({ success: false, message: 'A product with this slug already exists.' });
      }
      console.error('PUT /admin/products/:id error:', err);
      return res.status(500).json({ success: false, message: 'Server error updating product.' });
    }
  });
});

router.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found.' });
    await product.destroy();
    return res.json({ success: true, message: 'Product deleted.' });
  } catch (err) {
    console.error('DELETE /admin/products/:id error:', err);
    return res.status(500).json({ success: false, message: 'Server error deleting product.' });
  }
});

// ─── Portfolio CRUD ───────────────────────────────────────────────────────────

router.get('/portfolio', async (req, res) => {
  try {
    const items = await PortfolioItem.findAll({ order: [['createdAt', 'DESC']] });
    return res.json({ success: true, data: items });
  } catch (err) {
    console.error('GET /admin/portfolio error:', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.get('/portfolio/:id', async (req, res) => {
  try {
    const item = await PortfolioItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Portfolio item not found.' });
    return res.json({ success: true, data: item });
  } catch (err) {
    console.error('GET /admin/portfolio/:id error:', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.post('/portfolio', (req, res) => {
  uploadPortfolioImage(req, res, async (uploadErr) => {
    if (uploadErr) {
      return res.status(400).json({ success: false, message: uploadErr.message });
    }
    try {
      const { title, description, link } = req.body;
      if (!title) {
        return res.status(422).json({ success: false, message: 'Title is required.' });
      }
      const imageUrl = req.file ? `/uploads/${getFileRelativePath(req.file)}` : null;
      const item = await PortfolioItem.create({ title, description: description || null, image: imageUrl, link: link || null });
      return res.status(201).json({ success: true, message: 'Portfolio item created.', data: item });
    } catch (err) {
      console.error('POST /admin/portfolio error:', err);
      return res.status(500).json({ success: false, message: 'Server error creating portfolio item.' });
    }
  });
});

router.put('/portfolio/:id', (req, res) => {
  uploadPortfolioImage(req, res, async (uploadErr) => {
    if (uploadErr) {
      return res.status(400).json({ success: false, message: uploadErr.message });
    }
    try {
      const item = await PortfolioItem.findByPk(req.params.id);
      if (!item) return res.status(404).json({ success: false, message: 'Portfolio item not found.' });

      const { title, description, link } = req.body;
      const imageUrl = req.file ? `/uploads/${getFileRelativePath(req.file)}` : item.image;

      await item.update({
        title: title !== undefined ? title : item.title,
        description: description !== undefined ? description : item.description,
        image: imageUrl,
        link: link !== undefined ? link : item.link,
      });
      return res.json({ success: true, message: 'Portfolio item updated.', data: item });
    } catch (err) {
      console.error('PUT /admin/portfolio/:id error:', err);
      return res.status(500).json({ success: false, message: 'Server error updating portfolio item.' });
    }
  });
});

router.delete('/portfolio/:id', async (req, res) => {
  try {
    const item = await PortfolioItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Portfolio item not found.' });
    await item.destroy();
    return res.json({ success: true, message: 'Portfolio item deleted.' });
  } catch (err) {
    console.error('DELETE /admin/portfolio/:id error:', err);
    return res.status(500).json({ success: false, message: 'Server error deleting portfolio item.' });
  }
});

// ─── Testimonials CRUD ────────────────────────────────────────────────────────

router.get('/testimonials', async (req, res) => {
  try {
    const testimonials = await Testimonial.findAll({ order: [['createdAt', 'ASC']] });
    return res.json({ success: true, data: testimonials });
  } catch (err) {
    console.error('GET /admin/testimonials error:', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.get('/testimonials/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findByPk(req.params.id);
    if (!testimonial) return res.status(404).json({ success: false, message: 'Testimonial not found.' });
    return res.json({ success: true, data: testimonial });
  } catch (err) {
    console.error('GET /admin/testimonials/:id error:', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.post('/testimonials', (req, res) => {
  uploadTestimonialPhoto(req, res, async (uploadErr) => {
    if (uploadErr) {
      return res.status(400).json({ success: false, message: uploadErr.message });
    }
    try {
      const { name, designation, company, review_text, photo_url } = req.body;
      if (!name || !review_text) {
        return res.status(422).json({ success: false, message: 'name and review_text are required.' });
      }
      const uploadedPhotoUrl = req.file
        ? `/uploads/${getFileRelativePath(req.file)}`
        : (photo_url || '');

      const testimonial = await Testimonial.create({
        name,
        designation: designation || null,
        company: company || null,
        review_text,
        photo_url: uploadedPhotoUrl,
      });
      return res.status(201).json({ success: true, message: 'Testimonial created.', data: testimonial });
    } catch (err) {
      console.error('POST /admin/testimonials error:', err);
      return res.status(500).json({ success: false, message: 'Server error creating testimonial.' });
    }
  });
});

router.put('/testimonials/:id', (req, res) => {
  uploadTestimonialPhoto(req, res, async (uploadErr) => {
    if (uploadErr) {
      return res.status(400).json({ success: false, message: uploadErr.message });
    }
    try {
      const testimonial = await Testimonial.findByPk(req.params.id);
      if (!testimonial) return res.status(404).json({ success: false, message: 'Testimonial not found.' });

      const { name, designation, company, review_text, photo_url } = req.body;
      const updatedPhotoUrl = req.file
        ? `/uploads/${getFileRelativePath(req.file)}`
        : (photo_url !== undefined ? photo_url : testimonial.photo_url);

      await testimonial.update({
        name: name !== undefined ? name : testimonial.name,
        designation: designation !== undefined ? designation : testimonial.designation,
        company: company !== undefined ? company : testimonial.company,
        review_text: review_text !== undefined ? review_text : testimonial.review_text,
        photo_url: updatedPhotoUrl,
      });
      return res.json({ success: true, message: 'Testimonial updated.', data: testimonial });
    } catch (err) {
      console.error('PUT /admin/testimonials/:id error:', err);
      return res.status(500).json({ success: false, message: 'Server error updating testimonial.' });
    }
  });
});

router.delete('/testimonials/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findByPk(req.params.id);
    if (!testimonial) return res.status(404).json({ success: false, message: 'Testimonial not found.' });
    await testimonial.destroy();
    return res.json({ success: true, message: 'Testimonial deleted.' });
  } catch (err) {
    console.error('DELETE /admin/testimonials/:id error:', err);
    return res.status(500).json({ success: false, message: 'Server error deleting testimonial.' });
  }
});

// ─── Company Settings ─────────────────────────────────────────────────────────

/**
 * GET /api/admin/company-settings
 * Returns the current company settings (or empty object).
 */
router.get('/company-settings', async (req, res) => {
  try {
    const settings = await CompanySettings.findOne();
    return res.json({ success: true, data: settings || {} });
  } catch (err) {
    console.error('GET /admin/company-settings error:', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

/**
 * PUT /api/admin/company-settings
 * Upserts the single company settings row.
 * Supports optional favicon upload via multipart/form-data with field "file".
 */
router.put('/company-settings', (req, res) => {
  uploadMisc(req, res, async (uploadErr) => {
    if (uploadErr) {
      return res.status(400).json({ success: false, message: uploadErr.message });
    }
    try {
      const { company_name, address, phone, email, social_links, favicon_url } = req.body;

      const parsedSocialLinks = social_links !== undefined
        ? (typeof social_links === 'string' ? JSON.parse(social_links) : social_links)
        : undefined;

      const uploadedFaviconUrl = req.file
        ? `/uploads/${getFileRelativePath(req.file)}`
        : (favicon_url !== undefined ? favicon_url : undefined);

      let settings = await CompanySettings.findOne();

      if (settings) {
        await settings.update({
          company_name: company_name !== undefined ? company_name : settings.company_name,
          address: address !== undefined ? address : settings.address,
          phone: phone !== undefined ? phone : settings.phone,
          email: email !== undefined ? email : settings.email,
          social_links: parsedSocialLinks !== undefined ? parsedSocialLinks : settings.social_links,
          favicon_url: uploadedFaviconUrl !== undefined ? uploadedFaviconUrl : settings.favicon_url,
        });
      } else {
        settings = await CompanySettings.create({
          company_name: company_name || '',
          address: address || null,
          phone: phone || null,
          email: email || null,
          social_links: parsedSocialLinks || {},
          favicon_url: uploadedFaviconUrl || null,
        });
      }

      return res.json({ success: true, message: 'Company settings updated.', data: settings });
    } catch (err) {
      console.error('PUT /admin/company-settings error:', err);
      return res.status(500).json({ success: false, message: 'Server error updating company settings.' });
    }
  });
});

// ─── Contact Submissions ──────────────────────────────────────────────────────

/**
 * GET /api/admin/contacts
 * Returns all contact submissions, newest first.
 */
router.get('/contacts', async (req, res) => {
  try {
    const contacts = await ContactSubmission.findAll({ order: [['createdAt', 'DESC']] });
    return res.json({ success: true, data: contacts });
  } catch (err) {
    console.error('GET /admin/contacts error:', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

module.exports = router;
