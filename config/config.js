module.exports = {
    development: {
        username: process.env.username,
        password: process.env.password,
        database: process.env.database,
        host: process.env.host,
        dialect: 'mysql',
        logging: true,
    },
    test: {
        username: 'root',
        password: null,
        database: process.env.database,
        host: process.env.host,
        dialect: 'mysql',
        logging: false,
    },
    production: {
        username: 'root',
        password: null,
        database: process.env.database,
        host: process.env.host,
        dialect: 'mysql',
        logging: false,
    },
};
