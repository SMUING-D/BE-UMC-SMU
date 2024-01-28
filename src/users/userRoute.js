module.exports = function (app) {
    const userController = require('./userController');
    // 1.사용자 권한 조회
    app.get('/api/get/users-role', userController.getAllUsersRole);
};
