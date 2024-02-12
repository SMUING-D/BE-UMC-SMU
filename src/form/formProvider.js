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
