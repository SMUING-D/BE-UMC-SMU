module.exports = {
    development: {
        username: 'root',
        password: 'yaeyoon1004!',
        database: 'UMC_SMU',
        host: process.env.host,
        dialect: 'mysql',
        logging: false,
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
