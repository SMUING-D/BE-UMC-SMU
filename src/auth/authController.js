const authService = require('./authService');
const { response, errResponse } = require('../../config/response');
const baseResponse = require('../../config/response.status');

//학번 중복 확인 요청
exports.checkStudentId = async (req, res, next) => {
    try {
        if (!req.headers.studentId) {
            return res.send(errResponse(baseResponse.BAD_REQUEST));
        }

        const result = await authService.checkStudentId(req.headers.studentId);
        return res.send(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

//회원가입 요청
exports.join = async (req, res, next) => {
    const { studentId, name, password, nickname, majorName, email } = req.body;
    const userData = { studentId, name, password, nickname, majorName, email };

    try {
        const result = await authService.join(userData);
        return res.send(result);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

//인증 메일 보내기 요청
exports.sendVerificationEmail = async (req, res) => {
    try {
        const { studentId } = req.body;
        const result = await authService.sendVerificationEmail(studentId);
        return res.send(result);
    } catch (error) {
        console.error(error);
    }
};
