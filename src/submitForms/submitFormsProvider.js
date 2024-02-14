const SubmitForms = require('../../models/submitForms');

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
