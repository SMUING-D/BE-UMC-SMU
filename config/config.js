module.exports = {
    development: {
        username: 'root',
        password: 'yaeyoon1004!',
        database: 'UMC_SMU',
        host: 'localhost',
        dialect: 'mysql',
    },
    test: {
        username: 'root',
        password: null,
        database: process.env.database,
        host: process.env.host,
        dialect: 'mysql',
    },
    production: {
        username: 'root',
        password: null,
        database: process.env.database,
        host: process.env.host,
        dialect: 'mysql',
    },
};
