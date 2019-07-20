// config.js
const dotenv = require('dotenv');
dotenv.config();

const env = process.env.NODE_ENV; // 'dev' or 'test'

const dev = {
    app: {
        port: parseInt(process.env.DEV_APP_PORT) || ''
    },
    db: {
        host: process.env.DEV_DB_HOST || 'localhost',
        port: parseInt(process.env.DEV_DB_PORT) || 27017,
        name: process.env.DEV_DB_NAME || ''
    },
    twitterApkiKey: {
        consumerKey: process.env.CONSUMER_KEY,
        consumerSecret: process.env.CONSUMER_SECRET,
        accessToken: process.env.ACCESS_TOKEN,
        accessTokenSecret: process.env.ACCESS_TOKEN_SECRET
    }
};


const config = {
    dev
};

module.exports = config[env];