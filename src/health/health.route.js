const healthController = require('./health.controller');

module.exports = function (app) {
    app.get('', healthController.resHealth);
    app.get('/', healthController.resHealth);
    app.get('/health', healthController.resHealth);
}
