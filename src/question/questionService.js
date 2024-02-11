const { response, errResponse } = require('../../config/response');
const baseResponse = require('../../config/response.status');
const { userProvider } = require('../users/userProvider');

//질문 생성하기
exports.createQuestion = async (userId, question) => {
    try {
        const user = await userProvider.findExistUser(userId);
        if (!user) {
            return errResponse(baseResponse.MEMBER_NOT_FOUND);
        }
        if (!question.content || !question.type) {
            return errResponse(baseResponse.IS_REQUIRED_EMPTY);
        }
        const newQuestion = await userProvider.createQuestion(user.id, question);
        return response(baseResponse.SUCCESS_CREATE_QUESTION);
    } catch (error) {
        console.error(error);
    }
};
