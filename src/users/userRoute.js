module.exports = function (app) {
    const userController = require('./userController');
    // 1.사용자 권한 조회
    app.get('/api/get/users-role', userController.getAllUsersRole);
    // 2.사용자 권한 변경
    app.put('/api/put/update-user-role', userController.updateUserRole);
};
