module.exports = function (app) {
    const authService = require('./authService');
    // 1.회원가입
    app.post('/api/users/join', authService.join);
};
