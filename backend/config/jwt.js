'use strict';

module.exports = {
  secret: process.env.JWT_SECRET || 'aventrix_solutions_default_secret_change_in_production',
  expiresIn: process.env.JWT_EXPIRES_IN || '24h',
};
