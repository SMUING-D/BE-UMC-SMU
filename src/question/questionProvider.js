const Question = require('../../models/question');

//Question테이블에 질문 추가
exports.createQuestion = async (userId, question, formId) => {
    try {
        const newQuestion = await Question.create({
            content: question.content,
            type: question.type,
            isNecessary: question.isNecessary,
            userId: userId,
            formId: formId,
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
};
