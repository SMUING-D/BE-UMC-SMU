const { response, errResponse } = require('../../config/response');
const baseResponse = require('../../config/response.status');
const questionService = require('./questionService');

//질문 추가하기
exports.createQuestion = async (req, res, next) => {
    try {
        const user = res.locals.decoded.user;
        const { content, type } = req.body;
        const result = await questionService.createQuestion(user.id, req.body);
        return res.send(result);
    } catch (error) {
        console.error(error);
        next(error);
    }
};
