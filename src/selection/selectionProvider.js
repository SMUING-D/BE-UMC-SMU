const Selection = require('../../models/selection');

//Selection테이블에 선택지 추가
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

//selection테이블에 선택지 수정
exports.updateSelection = async (selectionId, selection) => {
    const updateSelection = await Selection.update(
        {
            content: selection.content,
        },
        {
            where: { id: selectionId },
        }
    );
};
