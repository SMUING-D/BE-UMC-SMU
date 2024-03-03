const { Sequelize } = require('sequelize');
const SubmitForms = require('../../models/submitForms');
const Response = require('../../models/response');
const Question = require('../../models/question');
const Form = require('../../models/form');
const User = require('../../models/umcUser');
const Part = require('../../models/part/part');
const Selection = require('../../models/selection');

/*지원서 제출하기*/
exports.createSubmitForm = async (userId, formId, partId) => {
    try {
        const submitForm = await SubmitForms.create({
            formId: formId,
            userId: userId,
            partId: partId,
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/*전체 지원서 불러오기*/
exports.findAllSubmitForms = async (formId) => {
    const submitForms = await SubmitForms.findAll({
        where: {
            formId: formId,
        },
        include: [{ model: Form }, { model: User }],
    });
    return submitForms;
};

/*파트별로 지원서 불러오기*/
exports.findSubmitFormsByPart = async (formId, partId) => {
    const submitForms = await SubmitForms.findAll({
        where: {
            formId: formId,
            partId: partId,
        },
        include: [{ model: Form }, { model: User }],
    });
    return submitForms;
};

/*지원서 불러오기 - 본인*/
exports.getMySubmitForm = async (submitId) => {
    const submitForm = await SubmitForms.findOne({
        where: { id: submitId },
        include: [
            {
                model: Form,
                include: [
                    {
                        model: Question,
                        include: [{ model: Selection }],
                    },
                ],
            },
            {
                model: Part,
            },
        ],
    });
    return submitForm;
};

/*지원서 상태 변경하기*/
exports.updateFormStatus = async (newStatus, submitId) => {
    const updateStatus = await SubmitForms.update(
        { status: newStatus },
        {
            where: { id: submitId },
        }
    );
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
