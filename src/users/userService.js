const { renderFile } = require('ejs');
const { response, errResponse } = require('../../config/response');
const baseResponse = require('../../config/response.status');
const userProvider = require('./userProvider');

//사용자 조회

//사용자 권한 조회
exports.getAllUsersRole = async () => {
    try {
        const usersRole = await userProvider.getAllUsersRole();
        return usersRole;
    } catch (error) {
        console.error(error);
    }
};

//사용자 권한 변경
exports.updateUserRole = async (userId, newRoleId) => {
    try {
        const updateRole = await userProvider.updateUserRole(userId, newRoleId);
        if (!updateRole) {
            return errResponse(baseResponse.BAD_REQUEST);
        }
        console.log('update Role : ', updateRole);
        return response(baseResponse.SUCCESS_UPDATE_ROLE);
    } catch (error) {
        console.error(error);
    }
};

//닉네임 변경하기
exports.updateNickname = async (userId, nickname) => {
    try {
        const user = await userProvider.findExistUser(userId);
        if (!user) {
            return errResponse(baseResponse.MEMBER_NOT_FOUND);
        }
        const updateUser = await userProvider.updateNickname(user.id, nickname);
        return response(baseResponse.SUCCESS_CHANGE_NICKNAME);
    } catch (error) {
        console.error(error);
    }
};
