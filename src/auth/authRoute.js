const { verifyAToken } = require('../../middlewares/index.js');

module.exports = function (app) {
    const authController = require('./authController.js');
    // 1.회원가입
    app.post('/api/auth/join', authController.join);
    // 2.로그인
    app.post('/api/auth/login', authController.login);
    // 3.Access Token 새로 발급받기
    app.get('/api/auth/refresh-access-token', authController.refreshAToken);
    // 4.인증 메일 보내기
    app.post('/api/auth/send-verification-email', authController.sendVerificationEmail);
    // 5.메일 인증 확인하기
    app.post('/auth/auth-email', authController.verifyEmail);
    // 6.비밀번호 찾기
    app.post('/api/auth/find-password', verifyAToken, authController.findPassword);
    // 7.비밀번호 확인하기
    app.post('/api/auth/check-password', verifyAToken, authController.checkPassword);
    // 8.비밀번호 변경하기
    app.put('/api/auth/change-password', verifyAToken, authController.changePassword);
};
