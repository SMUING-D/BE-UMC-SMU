const { verifyAToken } = require('../../middlewares/index.js');

module.exports = function (app) {
    const submitFormsController = require('./submitFormsController');

    // 1.제출한 지원서 불러오기 (본인)
    app.get('/api/form/get/my-submit/:submitId', verifyAToken, submitFormsController.getMySubmitForm);

    // 2.제출한 지원서 전체 불러오기 (운영진)
    app.get('/api/form/get/submit/:formId', verifyAToken, submitFormsController.getAllSubmitForms);

    // 3.제출한 지원서 파트별로 불러오기 (운영진)
    app.get('/api/form/get/submit/part/:partId/:formId', verifyAToken, submitFormsController.getSubmitFormsByPart);

    // 4.제출한 지원서 개별 불러오기 (운영진)
    app.get('/api/form/get/submitted/:submitId', verifyAToken, submitFormsController.getIndividualSubmitForm);

    // 5. 제출한 지원서 상태 변경하기 (운영진)
    app.put('/api/form/update/status/:submitId', verifyAToken, submitFormsController.updateFormStatus);
};
