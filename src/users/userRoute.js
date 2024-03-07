const { verifyAToken } = require('../../middlewares/index.js');

module.exports = function (app) {
    const userController = require('./userController');
    const imageUploader = require('../../middlewares/image.uploader.js');
    // 1.사용자 권한 조회
    app.get('/api/get/role', verifyAToken, userController.getAllUsersRole);
    // 2.사용자 권한 변경
    app.put('/api/update/role/:userId', verifyAToken, userController.updateUserRole);
    // 3.닉네임 변경하기
    app.put('/api/update/nickname', verifyAToken, userController.updateNickname);
    // 4.프로필 이미지 변경하기
    app.put('/api/update/profile-image', verifyAToken, imageUploader.imageUploader.single('profileImg'), userController.changeProfileImage);
    // 5.프로필 수정하기
    app.put('/api/update/profile', verifyAToken, userController.updateProfile);
};
