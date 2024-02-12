const Selection = require('../../models/selection');

//Selection테이블에 질문 추가
exports.createSelection = async (questionId, selection) => {
    try {
        const newSelection = await Selection.create({
            content: selection.content,
            questionId: questionId,
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
};
