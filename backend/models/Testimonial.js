'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Testimonial = sequelize.define('Testimonial', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  designation: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  company: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  review_text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  photo_url: {
    type: DataTypes.STRING(500),
    allowNull: true,
    defaultValue: '',
  },
}, {
  tableName: 'testimonials',
  timestamps: true,
});

module.exports = Testimonial;
