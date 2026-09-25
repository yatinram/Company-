'use strict';

const sequelize = require('../config/database');
const AdminUser = require('./AdminUser');
const Service = require('./Service');
const Product = require('./Product');
const PortfolioItem = require('./PortfolioItem');
const Testimonial = require('./Testimonial');
const CompanySettings = require('./CompanySettings');
const ContactSubmission = require('./ContactSubmission');

// Export sequelize instance and all models for easy import elsewhere
module.exports = {
  sequelize,
  AdminUser,
  Service,
  Product,
  PortfolioItem,
  Testimonial,
  CompanySettings,
  ContactSubmission,
};
