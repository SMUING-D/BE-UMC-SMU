const Response = require('../../models/response');

//답변 저장
exports.saveResponse = async (userId, response) => {
    await Response.create({
        content: response.content || '',
        questionId: response.questionId,
        userId: userId,
    });
};

exports.updateResponse = async (response) => {
    await Response.update(
        { content: response.content || '' },
        {
            where: { id: response.id, questionId: response.questionId },
        }
    );
};
