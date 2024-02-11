const { response, errResponse } = require('../../config/response');
const baseResponse = require('../../config/response.status');
const formProvider = require('./formProvider');
const userProvider = require('../users/userProvider');
const questionProvider = require('../question/questionProvider');

exports.createForm = async (userId, formInfo) => {
    try {
        const user = await userProvider.findExistUser(userId);
        if (!user) {
            return errResponse(baseResponse.MEMBER_NOT_FOUND);
        }
        console.log('formInfo', formInfo, formInfo.title, formInfo.questions);
        const form = await formProvider.createForm(user.id, formInfo.title);
        //question들 순서대로 question 테이블에 저장
        await Promise.all(
            questions.map(async (question) => {
                await questionProvider.createQuestion(user.id, formInfo.questions, form.id);
            })
        );
        return response(baseResponse.SUCCESS_CREATE_FORM);
    } catch (error) {
        console.error(error);
    }
};
