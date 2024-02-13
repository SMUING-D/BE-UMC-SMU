const { verifyAToken } = require('../../middlewares/index.js');

module.exports = function (app) {
    const formController = require('./formController.js');

    // 지원서 생성
    app.post('/api/form/create', verifyAToken, formController.createForm);

    // 지원서 수정
    app.put('/api/form/update/:formId', verifyAToken, formController.updateForm);
};
