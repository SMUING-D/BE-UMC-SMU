module.exports = function (app) {
    const userController = require('./userController');

    // 1. 회원가입 API
    Router.post('/api/users/login', userController.joinUser);
};
