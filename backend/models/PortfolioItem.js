'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PortfolioItem = sequelize.define('PortfolioItem', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING(500),
    allowNull: true,
    comment: 'URL or relative path to portfolio image',
  },
  link: {
    type: DataTypes.STRING(500),
    allowNull: true,
    comment: 'External URL to the portfolio project',
  },
}, {
  tableName: 'portfolio_items',
  timestamps: true,
});

module.exports = PortfolioItem;
