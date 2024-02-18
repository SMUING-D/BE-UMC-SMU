const SubmitForms = require('../../models/submitForms');
const Response = require('../../models/response');
const Question = require('../../models/question');
const Form = require('../../models/form');

/*지원서 제출하기*/
exports.createSubmitForm = async (userId, formId) => {
    try {
        const submitForm = await SubmitForms.create({
            formId: formId,
            userId: userId,
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/*지원서 불러오기 - 본인*/
exports.getMySubmitForm = async (userId, submitId) => {
    const submitForm = await SubmitForms.findOne({
        where: { id: submitId, userId: userId },
        include: [{ model: Form, include: [{ model: Question, include: [{ model: Response }] }] }],
    });
    return submitForm;
};

exports.findExistSubmitForm = async (userId, formId) => {
    const submitForm = await SubmitForms.findOne({
        where: {
            userId: userId,
            formId: formId,
        },
    });
    return submitForm;
};