require('dotenv').config(); //instatiate environment variables

//Make this global to use all over the application
CONFIG = {};

CONFIG.app             = process.env.APP                   || 'dev';
CONFIG.port            = process.env.PORT                  || '3000';
CONFIG.db_dialect      = process.env.DATABASE_DIALECT      || 'mysql';
CONFIG.db_host         = process.env.DATABASE_HOST         || 'mysql';
CONFIG.db_port         = process.env.DATABASE_PORT         || '3306';
CONFIG.db_name         = process.env.DATABASE_NAME         || 'Fitman_Database';
CONFIG.db_user         = process.env.DATABASE_USER         || 'user';
CONFIG.db_password     = process.env.DATABASE_PASSWORD     || 'password';
CONFIG.jwt_encryption  = process.env.JWT_ENCRYPTION        || 'ShhhhhhJWTEncryption!!!';
CONFIG.jwt_expiration  = process.env.JWT_EXPIRATION        || '100000000000000000';

module.exports = CONFIG;
