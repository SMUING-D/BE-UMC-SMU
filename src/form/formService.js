const { response, errResponse } = require('../../config/response');
const baseResponse = require('../../config/response.status');
const formProvider = require('./formProvider');
const userProvider = require('../users/userProvider');
const questionProvider = require('../question/questionProvider');
const selectionProvider = require('../selection/selectionProvider');

/*지원서 생성*/
exports.createForm = async (userId, formInfo) => {
    try {
        const user = await userProvider.findExistUser(userId);
        if (!user) {
            throw new Error(baseResponse.MEMBER_NOT_FOUND);
        }
        const form = await formProvider.createForm(user.id, formInfo.year, formInfo.title);
        //question들 순서대로 question 테이블에 저장
        await Promise.all(
            formInfo.questions.map(async (question) => {
                // 질문 생성 함수 호출
                await createQuestion(user.id, question, form.id);
            })
        );
        return response(baseResponse.SUCCESS_CREATE_FORM);
    } catch (error) {
        console.error(error);
    }
};
/*지원서 수정*/
//formInfo : formId, title, questions
exports.updateForm = async (userId, formInfo) => {
    try {
        const { formId, year, title, questions } = formInfo;
        const user = await userProvider.findExistUser(userId);
        if (!user) {
            throw new Error(baseResponse.MEMBER_NOT_FOUND);
        }
        const form = await formProvider.findExistForm(formId);
        if (!form) {
            throw new Error(baseResponse.FORM_NOT_FOUND);
        }
        const updateForm = await formProvider.updateForm(year, title);

        if (questions) {
            await Promise.all(
                questions.map(async (question) => {
                    //이미 있는 질문을 수정하는 경우
                    if (question.id) {
                        await updateQuestion(question, form.id);
                    } else {
                        // 새로운 질문인 경우
                        await createQuestion(user.id, question, form.id);
                    }
                })
            );
        }
        return response(baseResponse.SUCCESS_UPDATE_FORM);
    } catch (error) {
        console.error(error);
    }
};

/*생성한 지원서 불러오기*/
exports.getForm = async (userId, formId) => {
    try {
        const user = await userProvider.findExistUser(userId);
        if (!user) {
            return errResponse(baseResponse.MEMBER_NOT_FOUND);
        }
        const form = await formProvider.findExistForm(formId);
        if (!form) {
            return errResponse(baseResponse.FORM_NOT_FOUND);
        }
        const formData = {
            id: form.id,
            year: form.year,
            title: form.title,
            questions: await Promise.all(
                form.Questions.map(async (question) => {
                    if (question.type === 'SINGLE' || question.type === 'MULTIPLE') {
                        // 객관식인 경우 선택지도 함께 반환
                        return {
                            id: question.id,
                            content: question.content,
                            type: question.type,
                            isNecessary: question.isNecessary,
                            selections: await Promise.all(
                                question.Selections.map(async (selection) => ({
                                    id: selection.id,
                                    content: selection.content,
                                }))
                            ),
                        };
                    } else {
                        // 객관식이 아닌 경우 선택지는 반환하지 않음
                        return {
                            id: question.id,
                            content: question.content,
                            type: question.type,
                            isNecessary: question.isNecessary,
                        };
                    }
                })
            ),
        };
        return response(baseResponse.SUCCESS_GET_FORM, formData);
    } catch (error) {
        console.error(error);
    }
};

const createQuestion = async (userId, question, formId) => {
    let newQuestion;
    //question의 type에 따라
    switch (question.type) {
        //주관식
        case 'SHORT':
        case 'LONG':
            newQuestion = await questionProvider.createQuestion(userId, question, formId);
            break;
        //객관식
        case 'SINGLE':
        case 'MULTIPLE':
            newQuestion = await questionProvider.createQuestion(userId, question, formId);
            await Promise.all(
                question.selections.map(async (selection) => {
                    await selectionProvider.createSelection(newQuestion.id, selection);
                })
            );
            break;
        case 'UPLOAD':
            // 업로드 질문의 경우 추가적인 처리
            // TODO: 업로드 질문 처리 코드 작성
            break;
        default:
            console.error(error);
    }
    return newQuestion;
};

const updateQuestion = async (question, formId) => {
    let updatedQuestion;

    // 질문 업데이트
    switch (question.type) {
        // 주관식
        case 'SHORT':
        case 'LONG':
            updatedQuestion = await questionProvider.updateQuestion(question);
            break;
        // 객관식
        case 'SINGLE':
        case 'MULTIPLE':
            updatedQuestion = await questionProvider.updateQuestion(question);
            // 선택지 업데이트
            await Promise.all(
                question.selections.map(async (selection) => {
                    if (selection.id) {
                        // 이미 있는 선택지인 경우 업데이트
                        await selectionProvider.updateSelection(selection.id, selection);
                    } else {
                        // 새로운 선택지인 경우 생성
                        await selectionProvider.createSelection(updatedQuestion.id, selection);
                    }
                })
            );
            break;
        case 'UPLOAD':
            // 업로드 질문의 경우 추가적인 처리
            // TODO: 업로드 질문 처리 코드 작성
            break;
        default:
            console.error(error);
    }
    return updatedQuestion;
};
