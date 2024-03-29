const userService = require('./userService');
const { response, errResponse } = require('../../config/response');
const baseResponse = require('../../config/response.status');

// 사용자 권한 조회
exports.getAllUsersRole = async (req, res) => {
    try {
        const user = res.locals.decoded.user;
        const result = await userService.getAllUsersRole();
        return res.send(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json(errResponse(baseResponse.INTERNAL_SERVER_ERROR));
    }
};

//사용자 권한 변경 요청
exports.updateUserRole = async (req, res) => {
    try {
        const user = res.locals.decoded;
        const { userId } = req.params;
        const { newRoleId } = req.body;
        const result = await userService.updateUserRole(userId, newRoleId);
        return res.send(result);
    } catch (error) {
        console.error(error);
    }
};

//닉네임 변경하기
exports.updateNickname = async (req, res) => {
    try {
        const user = res.locals.decoded;
        const { nickname } = req.body;
        const result = await userService.updateNickname(user.userId, nickname);
        return res.send(result);
    } catch (error) {
        console.error(error);
    }
};

//프로필 이미지 변경하기
exports.changeProfileImage = async (req, res) => {
    try {
        const user = res.locals.decoded;
        const profileImg = req.file;
        const result = await userService.changeProfileImage(user.userId, profileImg);
        return res.send(result);
    } catch (error) {
        console.error(error);
    }
};

//프로필 수정하기
exports.updateProfile = async (req, res) => {
    try {
        const user = res.locals.decoded;
        const { name, nickname, description } = req.body;
        const result = await userService.updateProfile(user.userId, req.body);
        return res.send(result);
    } catch (error) {
        console.error(error);
    }
};
