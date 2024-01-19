const authService = require('./authService');
const { status } = require('../config/response.status.js');
const { response } = require('../config/response');

async function login(req, res) {
    const { studentId, password } = req.body;

    try {
        // 로그인 체크
        const result = await authService.login(studentId, password);

        // 성공 시
        res.status(status.SUCCESS.status).json(response(status.SUCCESS, result));
    } catch (error) {
        // 실패 시
        res.status(status.BAD_REQUEST.status).json(response(status.BAD_REQUEST, null));
    }
}

module.exports = {
    login,
};
