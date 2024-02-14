const { response, errResponse } = require('../../config/response');
const baseResponse = require('../../config/response.status');
const userProvider = require('../users/userProvider');
const formProvider = require('../form/formProvider');
const responseProvider = require('../response/responseProvider');

/*답변 저장하기*/
exports.saveResponses = async (userId, formId, responses) => {
    try {
        const user = await userProvider.findExistUser(userId);
        const form = await formProvider.findExistForm(formId);
        console.log('form', form);
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
