'use strict';

const express = require('express');
const { body, validationResult } = require('express-validator');
const { Service, Product, Testimonial, CompanySettings, ContactSubmission, PortfolioItem } = require('../models');

const router = express.Router();

// ─── Helper ───────────────────────────────────────────────────────────────────

const handleValidationErrors = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, errors: errors.array() });
  }
  return null;
};

// ─── Services ─────────────────────────────────────────────────────────────────

/**
 * GET /api/services
 * Returns all services ordered by display_order ascending.
 */
router.get('/services', async (req, res) => {
  try {
    const services = await Service.findAll({
      order: [['display_order', 'ASC']],
    });
    return res.json({ success: true, data: services });
  } catch (err) {
    console.error('GET /services error:', err);
    return res.status(500).json({ success: false, message: 'Server error fetching services.' });
  }
});

/**
 * GET /api/services/:id
 * Returns a single service by primary key.
 */
router.get('/services/:id', async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found.' });
    }
    return res.json({ success: true, data: service });
  } catch (err) {
    console.error('GET /services/:id error:', err);
    return res.status(500).json({ success: false, message: 'Server error fetching service.' });
  }
});

// ─── Products ─────────────────────────────────────────────────────────────────

/**
 * GET /api/products
 * Returns all products.
 */
router.get('/products', async (req, res) => {
  try {
    const products = await Product.findAll({ order: [['createdAt', 'ASC']] });
    return res.json({ success: true, data: products });
  } catch (err) {
    console.error('GET /products error:', err);
    return res.status(500).json({ success: false, message: 'Server error fetching products.' });
  }
});

/**
 * GET /api/products/:slug
 * Returns a single product by its URL slug.
 */
router.get('/products/:slug', async (req, res) => {
  try {
    const product = await Product.findOne({ where: { slug: req.params.slug } });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }
    return res.json({ success: true, data: product });
  } catch (err) {
    console.error('GET /products/:slug error:', err);
    return res.status(500).json({ success: false, message: 'Server error fetching product.' });
  }
});

// ─── Portfolio / Our Works ──────────────────────────────────────────────────

/**
 * GET /api/portfolio
 * Returns all portfolio items ordered by createdAt descending.
 */
router.get('/portfolio', async (req, res) => {
  try {
    const items = await PortfolioItem.findAll({ order: [['createdAt', 'DESC']] });
    return res.json({ success: true, data: items });
  } catch (err) {
    console.error('GET /portfolio error:', err);
    return res.status(500).json({ success: false, message: 'Server error fetching portfolio items.' });
  }
});

/**
 * GET /api/portfolio/:id
 * Returns a single portfolio item by id.
 */
router.get('/portfolio/:id', async (req, res) => {
  try {
    const item = await PortfolioItem.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Portfolio item not found.' });
    }
    return res.json({ success: true, data: item });
  } catch (err) {
    console.error('GET /portfolio/:id error:', err);
    return res.status(500).json({ success: false, message: 'Server error fetching portfolio item.' });
  }
});

// ─── Testimonials ─────────────────────────────────────────────────────────────

/**
 * GET /api/testimonials
 * Returns all testimonials ordered by creation date descending.
 */
router.get('/testimonials', async (req, res) => {
  try {
    const testimonials = await Testimonial.findAll({ order: [['createdAt', 'ASC']] });
    return res.json({ success: true, data: testimonials });
  } catch (err) {
    console.error('GET /testimonials error:', err);
    return res.status(500).json({ success: false, message: 'Server error fetching testimonials.' });
  }
});

// ─── Company Settings ─────────────────────────────────────────────────────────

/**
 * GET /api/company-settings
 * Returns the single company settings row.
 */
router.get('/company-settings', async (req, res) => {
  try {
    const settings = await CompanySettings.findOne();
    if (!settings) {
      return res.status(404).json({ success: false, message: 'Company settings not configured yet.' });
    }
    return res.json({ success: true, data: settings });
  } catch (err) {
    console.error('GET /company-settings error:', err);
    return res.status(500).json({ success: false, message: 'Server error fetching company settings.' });
  }
});

// ─── Contact Submission ───────────────────────────────────────────────────────

/**
 * POST /api/contact
 * Validates and saves a contact form submission.
 * Required fields: name, email, message
 */
router.post(
  '/contact',
  [
    body('name').trim().notEmpty().withMessage('Name is required.'),
    body('email').trim().isEmail().withMessage('A valid email address is required.'),
    body('message').trim().notEmpty().withMessage('Message is required.'),
    body('phone').optional().trim(),
  ],
  async (req, res) => {
    const validationError = handleValidationErrors(req, res);
    if (validationError !== null) return;

    try {
      const { name, email, phone, message } = req.body;
      const submission = await ContactSubmission.create({ name, email, phone: phone || null, message });
      return res.status(201).json({
        success: true,
        message: 'Your message has been received. We will get back to you soon!',
        data: submission,
      });
    } catch (err) {
      console.error('POST /contact error:', err);
      return res.status(500).json({ success: false, message: 'Server error saving your message.' });
    }
  }
);

module.exports = router;
