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
        return newQuestion;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

//Question테이블에 질문 수정
exports.updateQuestion = async (question) => {
    const updateQuestion = await Question.update(
        {
            content: question.content,
            type: question.type,
            isNecessary: question.isNecessary,
        },
        {
            where: { id: question.id },
        }
    );
};
