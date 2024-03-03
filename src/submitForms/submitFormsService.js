const { response, errResponse } = require('../../config/response');
const baseResponse = require('../../config/response.status');
const formProvider = require('../form/formProvider');
const questionProvider = require('../question/questionProvider');
const responseProvider = require('../response/responseProvider');
const userProvider = require('../users/userProvider');
const submitFormsProvider = require('../submitForms/submitFormsProvider');
const UserPart = require('../../models/part/userPart');

//제출한 지원서 전체 불러오기 (운영진)
exports.getAllSubmitForms = async (user, formId) => {
    try {
        const staff = await userProvider.findExistStaff(user.userId, user.roleId);
        if (staff.roleId !== 3) {
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

//파트별로 지원서 불러오기 (운영지)
exports.getSubmitFormsByPart = async (user, formId, partId) => {
    try {
        const staff = await userProvider.findExistStaff(user.userId, user.roleId);
        if (staff.roleId !== 3) {
            const error = errResponse(baseResponse.UNAUTHORIZED);
            throw error;
        }
        const submitForms = await submitFormsProvider.findSubmitFormsByPart(formId, partId);
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
        // Part 정보 가져오기
        const part = { id: submitForm.Part.id, name: submitForm.Part.name };
        // 지원서 데이터 가져오기
        const submitFormData = await findExistFormData(submitForm);
        return response(baseResponse.SUCCESS_GET_FORM, { submitId: submitForm.id, part: part, submitFormData });
    } catch (error) {
        return errResponse(error);
    }
};

const findExistFormData = async (submitForm) => {
    let form = submitForm.Form;
    let questions = form.Questions;
    const formData = await Promise.all(
        questions.map(async (question) => {
            const response = await responseProvider.getResponse(question.id, submitForm.userId);
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
                        question: {
                            id: question.id,
                            content: question.content,
                            type: question.type,
                            isNecessary: question.isNecessary,
                            selections: selections,
                        },
                        response: response ? { id: response.id, content: response.content } : null,
                    };
                default:
                    return {
                        question: {
                            id: question.id,
                            content: question.content,
                            type: question.type,
                            isNecessary: question.isNecessary,
                        },
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
        // 제출한 지원서 가져오기
        const submitForm = await submitFormsProvider.getMySubmitForm(submitId);
        // 상태 변경
        const updateStatus = await submitFormsProvider.updateFormStatus(newStatus, submitForm.id);
        // 만약 상태가 '최종 합격'인 경우에만 UserPart 테이블에 데이터 추가
        if (newStatus === '최종 합격') {
            await UserPart.create({
                userId: submitForm.userId,
                partId: submitForm.partId,
                year: submitForm.Form.year,
            });
        }
        return response(baseResponse.SUCCESS_UPDATE_STATUS);
    } catch (error) {
        return errResponse(error);
    }
};
