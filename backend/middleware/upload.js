'use strict';

const multer = require('multer');
const path = require('path');
const fs = require('fs');

/**
 * Creates a multer storage engine that saves files to the given destination folder.
 * Destination is created automatically if it does not exist.
 */
const createStorage = (destination) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(__dirname, '..', 'uploads', destination);
      // Ensure the upload directory exists
      fs.mkdirSync(uploadPath, { recursive: true });
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const ext = path.extname(file.originalname).toLowerCase();
      cb(null, `${uniqueSuffix}${ext}`);
    },
  });
};

/**
 * File filter — only allows common image MIME types.
 */
const imageFileFilter = (req, file, cb) => {
  const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, GIF, WEBP, and SVG images are allowed.'), false);
  }
};

/**
 * Multer instance for product images — saves to uploads/products/
 * Accepts up to 10 images at a time under the field name "images".
 */
const uploadProductImages = multer({
  storage: createStorage('products'),
  fileFilter: imageFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB per file
}).array('images', 10);

/**
 * Multer instance for testimonial photos — saves to uploads/testimonials/
 * Accepts a single file under the field name "photo".
 */
const uploadTestimonialPhoto = multer({
  storage: createStorage('testimonials'),
  fileFilter: imageFileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB
}).single('photo');

/**
 * Multer instance for portfolio images — saves to uploads/portfolio/
 * Accepts a single file under the field name "image".
 */
const uploadPortfolioImage = multer({
  storage: createStorage('portfolio'),
  fileFilter: imageFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
}).single('image');

/**
 * Multer instance for misc uploads (e.g. favicon) — saves to uploads/misc/
 */
const uploadMisc = multer({
  storage: createStorage('misc'),
  fileFilter: imageFileFilter,
  limits: { fileSize: 1 * 1024 * 1024 }, // 1 MB
}).single('file');

module.exports = {
  uploadProductImages,
  uploadTestimonialPhoto,
  uploadPortfolioImage,
  uploadMisc,
};
