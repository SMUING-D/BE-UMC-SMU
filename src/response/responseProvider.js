const Response = require('../../models/response');

//주관식 저장
exports.saveResponse = async (userId, questionId, response) => {
    await Response.create({
        content: response.content || '',
        questionId: questionId,
        userId: userId,
    });
};
