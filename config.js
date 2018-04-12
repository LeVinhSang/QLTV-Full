require('dotenv').config();

module.exports = {
    services:[
        require('./http'),
        require('./database'),
        require('./src/book'),
        require('./src/borrower'),
        require('./src/publisher'),
        require('./src/user'),
        require('./service/mail-code'),
        require('./service/mail-outdate')
    ],

    database : {
        client: 'mysql',
        connection: {
            host     : process.env.DB_HOST,
            user     : process.env.DB_USER,
            password : process.env.DB_PASS,
            database : process.env.DB_DATA,
        }
    },

    http : {
        port: process.env.HTTP_PORT || 3000
    }

};