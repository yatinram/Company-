'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CompanySettings = sequelize.define('CompanySettings', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  company_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: '',
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: true,
    validate: {
      isEmail: true,
    },
  },
  social_links: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: {},
    comment: 'JSON: { facebook, twitter, linkedin, instagram }',
  },
  favicon_url: {
    type: DataTypes.STRING(500),
    allowNull: true,
  },
}, {
  tableName: 'company_settings',
  timestamps: true,
});

module.exports = CompanySettings;
