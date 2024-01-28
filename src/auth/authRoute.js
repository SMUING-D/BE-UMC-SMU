module.exports = function (app) {
    const authController = require('./authController');
    // 1.회원가입
    app.post('/api/users/join', authController.join);
    // 2.인증 메일 보내기
    app.post('/api/users/send-verification-email', authController.sendVerificationEmail);
    // 3.메일 인증 확인하기
    app.get('/auth/auth_email', authController.verifyEmail);
    // 4.비밀번호 찾기
    app.post('/api/users/find-password', authController.findPassword);
};
