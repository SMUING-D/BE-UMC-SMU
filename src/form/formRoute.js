const { verifyAToken } = require('../../middlewares/index.js');

module.exports = function (app) {
    const formController = require('./formController.js');

    // 지원서 생성
    app.post('/api/form/create', verifyAToken, formController.createForm);
    // 지원서 수정
    app.put('/api/form/update/:formId', verifyAToken, formController.updateForm);
    // 생성한 지원서 불러오기
    app.get('/api/form/get/:formId', verifyAToken, formController.getForm);
};
