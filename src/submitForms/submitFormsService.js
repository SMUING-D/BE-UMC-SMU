const { response, errResponse } = require('../../config/response');
const baseResponse = require('../../config/response.status');
const formProvider = require('../form/formProvider');
const questionProvider = require('../question/questionProvider');
const responseProvider = require('../response/responseProvider');
const userProvider = require('../users/userProvider');
const submitFormsProvider = require('../submitForms/submitFormsProvider');

/*내가 제출한 지원서 불러오기*/
exports.getMySubmitForm = async (userId, submitId) => {
    try {
        const user = await userProvider.findExistUser(userId);
        if (!user) {
            throw new Error(baseResponse.MEMBER_NOT_FOUND);
        }
        const submitForm = await submitFormsProvider.getMySubmitForm(user.id, submitId);
        const form = await submitForm.getForm();
        const responses = await submitForm.getResponses();
        await Promise.all(
            responses.map(async (response) => {
                const question = await response.getQuestion();
                const formData = {
                    question: {
                        id: question.id,
                        content: question.content,
                        type: question.type,
                    },
                    response: {
                        id: response.id,
                    },
                };
                // 객관식인 경우 선택지 정보 추가
                if (question.type === 'SINGLE' || question.type === 'MULTIPLE') {
                    const selections = await question.getSelections();
                    formData.question.selections = selections.map((selection) => ({
                        id: selection.id,
                        content: selection.content,
                    }));

                    //응답에 선택한 선택지 정보 추가
                    const selectedOptionIds = response.content.split(',');
                    //selections 배열을 순회하면서 각 선택지의 ID가 selectedOptionIds 배열에 포함되어 있는지 확인
                    const selectedOptions = selections.filter((selection) => selectedOptionIds.includes(String(selection.id)));
                    formData.response.selections = selectedOptions.map((option) => ({
                        id: option.id,
                        content: option.content,
                    }));
                } else {
                    // 주관식인 경우 응답의 내용(content) 추가
                    formData.response.content = response.content;
                }
            })
        );
        return response(baseResponse.SUCCESS_GET_FORM, {
            id: form.id,
            title: form.title,
            formData: formData,
        });
    } catch (error) {
        console.error(error);
    }
};
