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
        return res.send(response(baseResponse.SUCCESS, result));
    } catch (error) {
        console.error(error);
        next(error);
    }
};

//회원가입 요청
exports.join = async (req, res, next) => {
    const { studentId, name, password, nickname, majorName, email } = req.body;
    const userData = { studentId, name, password, nickname, majorName, email };

    try {
        const result = await authService.join(userData);
        return res.send(response(baseResponse.SUCCESS, result));
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
        return res.send(response(baseResponse.SUCCESS, result));
    } catch (error) {
        console.error(error);
    }
};

// 메일 인증 확인하기
exports.verifyEmail = async (req, res) => {
    try {
        const { code } = req.query;
        const result = await authService.verifyEmail(code);
        return res.send(result);
    } catch (error) {
        console.error(error);
    }
};

//비밀번호 찾기
exports.findPassword = async (req, res, next) => {
    try {
        const { studentId } = req.body;
        if (!studentId) {
            return res.send(errResponse(baseResponse.BAD_REQUEST));
        }
        const result = await authService.findPassword(studentId);
        return res.send(result);
    } catch (error) {
        console.error(error);
        return next(error);
    }
};

//비밀번호 확인하기
exports.checkPassword = async (req, res, next) => {
    try {
        // const user = await this.checkStudentId(res.locals.decodes.user_id);
        const { user, password } = req.body;
        const result = await authService.checkPassword(user, password);
        return res.send(result);
    } catch (error) {
        console.error(error);
        return next(error);
    }
};
