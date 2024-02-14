const { verifyAToken } = require('../../middlewares/index.js');

module.exports = function (app) {
    const responseController = require('./responseController.js');
    // 1.답변 생성하기
    app.post('/api/response/save', verifyAToken, responseController.saveResponses);
};
