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
                await saveResponse(user.id, response);
            })
        );
        return response(baseResponse.SUCCESS_SAVE_RESPONSE);
    } catch (error) {
        console.error(error);
    }
};

//답변 저장하기
const saveResponse = async (userId, response) => {
    if (response.id) {
        //답변 수정하는 경우
        const updateResponse = await responseProvider.updateResponse(response);
        return updateResponse;
    } else {
        //새로운 답변 추가하는 경우
        const createResponse = await responseProvider.createResponse(userId, response);
        return createResponse;
    }
};

/*답변 제출하기*/
//TO DO : 필수 질문 확인
//TO DO : 중복 제출 불가
exports.submitResponse = async (userId, formId, responses) => {
    try {
        const user = await userProvider.findExistUser(userId);
        const form = await formProvider.findExistForm(formId);
        //이미 제출했을 경우
        if (await submitFormsProvider.findExistSubmitForm(user.id, form.id)) {
            return errResponse(baseResponse.SUBMITTED_FORM_ALREADY_EXISTS);
        }
        await form.Questions.forEach(async (question, index) => {
            console.log('response.content', responses[index].content);
            if (question.isNecessary && responses[index].content === null) {
                return errResponse(baseResponse.IS_REQUIRED_EMPTY);
            } else {
                const response = await saveResponse(user.id, responses[index]);
            }
        });
        await submitFormsProvider.createSubmitForm(user.id, form.id);
        return response(baseResponse.SUCCESS_SUBMIT_RESPONSE);
    } catch (error) {
        console.error(error);
    }
};
