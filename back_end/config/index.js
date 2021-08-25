require('dotenv').config();

module.exports = {
    env: process.env.NODE_ENV,
    port: process.env.PORT || 3000,
    jwt_secret: process.env.JWT_SECRET,
    database: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || '3306',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'root',
        name: process.env.DB_NAME || 'datawarehouse'
    }
};