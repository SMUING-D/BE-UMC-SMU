const Response = require('../../models/response');

//답변 저장
exports.createResponse = async (userId, response) => {
    const createResponse = await Response.create({
        content: response.content || null,
        questionId: response.questionId,
        userId: userId,
    });
    return createResponse;
};

//답변 수정
exports.updateResponse = async (response) => {
    const updateResponse = await Response.update(
        { content: response.content || null },
        {
            where: { id: response.id, questionId: response.questionId },
        }
    );
    return updateResponse;
};

exports.getResponse = async (questionId, userId) => {
    const response = await Response.findOne({
        where: {
            questionId: questionId,
            userId: userId,
        },
    });
    return response;
};
