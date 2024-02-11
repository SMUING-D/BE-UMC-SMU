const formService = require('./formService');
const { response, errResponse } = require('../../config/response');
const baseResponse = require('../../config/response.status');

//질문 추가
exports.checkStudentId = async (req, res, next) => {
    try {
        if (!req.headers.studentId) {
            return res.send(errResponse(baseResponse.BAD_REQUEST));
        }

        const result = await authService.checkStudentId(req.headers.studentId);
        return res.send(response(baseResponse.SUCCESS, result));
    } catch (error) {
        console.error(error);
        next(error);
    }
};
