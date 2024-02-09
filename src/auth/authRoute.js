const { verifyAToken } = require('../../middlewares/index.js');
const authController = require('./authController.js');

module.exports = function (app) {
    // 1.회원가입
    app.post('/api/auth/join', authController.join);
    // 2.로그인
    app.post('/api/auth/login', authController.login);
    // 2.인증 메일 보내기
    app.post('/api/auth/send-verification-email', authController.sendVerificationEmail);
    // 3.메일 인증 확인하기
    app.get('/auth/auth_email', authController.verifyEmail);
    // 4.비밀번호 찾기
    app.post('/api/auth/find-password', verifyAToken, authController.findPassword);
    // 5.비밀번호 확인하기
    app.post('/api/auth/check-password', verifyAToken, authController.checkPassword);
    // 6.비밀번호 변경하기
    app.put('/api/auth/change-password', verifyAToken, authController.changePassword);
};
