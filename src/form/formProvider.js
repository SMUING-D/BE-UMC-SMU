const Form = require('../../models/form');

//Form테이블에 질문 추가
exports.createForm = async (userId, title) => {
    try {
        const newForm = await Form.create({
            title: title,
            userId: userId,
        });
        return newForm;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
//Form 수정
exports.updateForm = async (formId, title) => {
    const updateForm = await Form.update(
        { title: title },
        {
            where: { id: formId },
        }
    );
};

exports.findExistForm = async (userId, formId) => {
    const form = await Form.findOne({
        where: {
            id: formId,
            userId: userId,
        },
    });
    return form;
};
