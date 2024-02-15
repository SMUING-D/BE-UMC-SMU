const { verifyAToken } = require('../../middlewares/index.js');

module.exports = function (app) {
    const submitFormsController = require('./submitFormsController');

    // 1.제출한 지원서 불러오기 (본인)
    app.get('/api/form/get/submit/:submitId', verifyAToken, submitFormsController.getMySubmitForm);
};
