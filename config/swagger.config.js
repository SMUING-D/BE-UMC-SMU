const SwaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        info: {
            title: 'UMC_SMU API',
            version: '1.0.0',
            description: 'UMC_SMU API with express, API 설명'
        },
        host: 'localhost:3000',
        basepath: '../'
    },
    apis: ['./src/routes/*.js', './swagger/*']
};

// Change 'export const' to 'module.exports ='
module.exports.specs = SwaggerJsdoc(options);
