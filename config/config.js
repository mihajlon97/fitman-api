require('dotenv').config(); //instatiate environment variables

//Make this global to use all over the application
CONFIG = {};

CONFIG.app          = process.env.APP   || 'dev';
CONFIG.port         = process.env.FITMAN_API_PORT  || '3000';

CONFIG.db_dialect   = process.env.DATABASE_DIALECT    || 'mysql';
CONFIG.db_host      = process.env.DATABASE_HOST       || '46.101.191.211';;
CONFIG.db_port      = process.env.DATABASE_PORT       || '3306';
CONFIG.db_name      = process.env.DATABASE_NAME       || 'Fitman_Database';
CONFIG.db_user      = process.env.DATABASE_USER       || 'fitman';
CONFIG.db_password  = process.env.DATABASE_PASSWORD   || '';

CONFIG.jwt_encryption  = process.env.JWT_ENCRYPTION || 'ShhhhhhJWTencryption!!!';
CONFIG.jwt_expiration  = process.env.JWT_EXPIRATION || '10000';

module.exports = CONFIG;
