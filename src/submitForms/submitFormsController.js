const submitFormsService = require('./submitFormsService');

exports.getMySubmitForm = async (req, res, next) => {
    try {
        const user = res.locals.decoded;
        const { submitId } = req.params;
        const result = await submitFormsService.getMySubmitForm(user.userId, submitId);
        return res.send(result);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

//제출한 지원서 전체 불러오기 (운영진)
exports.getAllSubmitForms = async (req, res, next) => {
    try {
        const user = res.locals.decoded;
        const { formId } = req.params;
        const result = await submitFormsService.getAllSubmitForms(user, formId);
        return res.send(result);
    } catch (error) {
        console.error(error);
        next(error);
    }
};
//제출한 지원서 파트별로 불러오기 (운영진)
exports.getSubmitFormsByPart = async (req, res, next) => {
    try {
        const user = res.locals.decoded;
        const { formId, partId } = req.params;
        const result = await submitFormsService.getSubmitFormsByPart(user, formId, partId);
        return res.send(result);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

//제출한 지원서 개별 불러오기 (운영진)
exports.getIndividualSubmitForm = async (req, res, next) => {
    try {
        const user = res.locals.decoded;
        const { submitId } = req.params;
        const result = await submitFormsService.getIndividualSubmitForm(user.userId, submitId);
        return res.send(result);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

//제출한 지원서 상태변경 (운영진)
//'제출 완료', '서류 합격', '최종 합격', '불합격'
exports.updateFormStatus = async (req, res, next) => {
    try {
        const user = res.locals.decoded;
        const { submitId } = req.params;
        const { newStatus } = req.body;
        const result = await submitFormsService.updateFormStatus(user, submitId, newStatus);
        return res.send(result);
    } catch (error) {
        console.error(error);
        next(error);
    }
};
