const { response, errResponse } = require('../../config/response');
const baseResponse = require('../../config/response.status');

/*답변 저장하기*/
exports.saveResponses = async (userId, responses) => {
    try {
        const user = await findExistUser(userId);
        const form = await formProvider.createForm(user.id, formInfo.title);
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
