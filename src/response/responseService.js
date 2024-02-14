const { response, errResponse } = require('../../config/response');
const baseResponse = require('../../config/response.status');
const userProvider = require('../users/userProvider');
const formProvider = require('../form/formProvider');
const responseProvider = require('../response/responseProvider');
const submitFormsProvider = require('../submitForms/submitFormsProvider');

/*답변 저장하기*/
exports.saveResponses = async (userId, formId, responses) => {
    try {
        const user = await userProvider.findExistUser(userId);
        const form = await formProvider.findExistForm(formId);
        //response들 순서대로 response 테이블에 저장
        await Promise.all(
            responses.map(async (response) => {
                if (response.id) {
                    await responseProvider.updateResponse(response);
                } else {
                    await responseProvider.saveResponse(user.id, response);
                }
            })
        );
        return response(baseResponse.SUCCESS_SAVE_RESPONSE);
    } catch (error) {
        console.error(error);
    }
};

/*답변 제출하기*/
exports.submitResponse = async (userId, formId, responses) => {
    try {
        const user = await userProvider.findExistUser(userId);
        const form = await formProvider.findExistForm(formId);
        await Promise.all(
            responses.map(async (response) => {
                if (!response.id) {
                    await responseProvider.saveResponse(user.id, response);
                }
            })
        );
        await submitFormsProvider.createSubmitForm(user.id, formId);
        return response(baseResponse.SUCCESS_SUBMIT_RESPONSE);
    } catch (error) {
        console.error(error);
    }
};
