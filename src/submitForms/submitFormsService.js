const { response, errResponse } = require('../../config/response');
const baseResponse = require('../../config/response.status');
const formProvider = require('../form/formProvider');
const questionProvider = require('../question/questionProvider');
const responseProvider = require('../response/responseProvider');
const userProvider = require('../users/userProvider');
const submitFormsProvider = require('../submitForms/submitFormsProvider');

//제출한 지원서 전체 불러오기 (운영진)
exports.getAllSubmitForms = async (user, formId) => {
    try {
        const staff = await userProvider.findExistStaff(user.userId, user.roleId);
        if (!staff) {
            const error = errResponse(baseResponse.UNAUTHORIZED);
            throw error;
        }
        const submitForms = await submitFormsProvider.findAllSubmitForms(formId);
        if (submitForms.length === 0) {
            return errResponse(baseResponse.FORM_NOT_FOUND);
        }
        const submitList = submitForms.map((submitForm) => {
            return {
                id: submitForm.id,
                title: submitForm.Form.title,
                name: submitForm.User.name,
            };
        });
        return response(baseResponse.SUCCESS_GET_FORM, submitList);
    } catch (error) {
        return errResponse(error);
    }
};
/*내가 제출한 지원서 불러오기*/
/*개별 지원서 불러오기*/
exports.getIndividualSubmitForm = async (userId, submitId) => {
    try {
        const user = await userProvider.findExistUser(userId);
        if (!user) {
            throw error(baseResponse.MEMBER_NOT_FOUND);
        }
        const submitForm = await submitFormsProvider.getMySubmitForm(submitId);
        const submitFormData = await formData(submitForm);
        return response(baseResponse.SUCCESS_GET_FORM, submitFormData);
    } catch (error) {
        return errResponse(error);
    }
};

const formData = async (submitForm) => {
    let form = submitForm.Form;
    let questions = form.Questions;
    const formData = await Promise.all(
        questions.map(async (question) => {
            console.log('questionId', question.id);
            const response = await responseProvider.getResponse(question.id, submitForm.userId);
            console.log('responseId', response.id);
            switch (question.type) {
                case 'SINGLE':
                case 'MULTIPLE':
                    const selections = await Promise.all(
                        question.Selections.map(async (selection) => ({
                            id: selection.id,
                            content: selection.content,
                        }))
                    );
                    console.log(selections);
                    return {
                        id: question.id,
                        content: question.content,
                        type: question.type,
                        isNecessary: question.isNecessary,
                        selections: selections,
                        response: response ? { id: response.id, content: response.content } : null,
                    };
                default:
                    return {
                        id: question.id,
                        content: question.content,
                        type: question.type,
                        isNecessary: question.isNecessary,
                        response: response ? { id: response.id, content: response.content } : null,
                    };
            }
        })
    );
    return formData;
};
//제출한 지원서 상태 변경하기
//'제출 완료', '서류 합격', '최종 합격', '불합격'
exports.updateFormStatus = async (user, submitId, newStatus) => {
    try {
        //운영진인지 확인하기
        const staff = await userProvider.findExistStaff(user.userId, user.roleId);
        if (!staff) {
            const error = errResponse(baseResponse.UNAUTHORIZED);
            throw error;
        }
        const updateForm = await submitFormsProvider.updateFormStatus(newStatus, submitId);
        return response(baseResponse.SUCCESS_UPDATE_STATUS);
    } catch (error) {
        return errResponse(error);
    }
};
