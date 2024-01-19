module.exports = function (app) {
    const authController = require('./authController');

    // 1.사용자 권한 부여
    router.put('/changeUserRole/:userId/:newRoleId', authController.changeUserRole);
};
