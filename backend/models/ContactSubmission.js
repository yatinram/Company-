'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ContactSubmission = sequelize.define('ContactSubmission', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  phone: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'contact_submissions',
  timestamps: true,
  updatedAt: false,
});

module.exports = ContactSubmission;
