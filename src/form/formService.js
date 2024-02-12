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
            return errResponse(baseResponse.MEMBER_NOT_FOUND);
        }
        console.log('formInfo', formInfo, formInfo.title, formInfo.questions);
        const form = await formProvider.createForm(user.id, formInfo.title);
        //question들 순서대로 question 테이블에 저장
        await Promise.all(
            formInfo.questions.map(async (question) => {
                //question의 type에 따라
                switch (question.type) {
                    //주관식
                    case 'SHORT':
                    case 'LONG':
                        await questionProvider.createQuestion(user.id, question, form.id);
                        break;
                    //객관식
                    case 'SINGLE':
                    case 'MULTIPLE':
                        const newQuestion = await questionProvider.createQuestion(user.id, question, form.id);
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
            })
        );
        return response(baseResponse.SUCCESS_CREATE_FORM);
    } catch (error) {
        console.error(error);
    }
};
