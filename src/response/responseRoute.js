const { verifyAToken } = require('../../middlewares/index.js');

module.exports = function (app) {
    const responseController = require('./responseController.js');
    // 1.답변 생성하기
    app.put('/api/response/save/:formId', verifyAToken, responseController.saveResponses);
    // 2.답변 제출하기
    app.post('/api/response/submit', verifyAToken, responseController.submitResponse);
};
