const { verifyAToken } = require('../../middlewares/index.js');

module.exports = function (app) {
    const responseController = require('./responseController.js');
    // 1.답변 생성하기
    app.put('/api/response/save/:formId', verifyAToken, responseController.saveResponses);
};
