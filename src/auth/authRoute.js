module.exports = function (app) {
    const authController = require('../authController');

    //1.  로그인 API
    router.post('/api/users/login', authController.login);
};
