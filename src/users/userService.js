const { renderFile } = require('ejs');
const { response, errResponse } = require('../../config/response');
const baseResponse = require('../../config/response.status');
const userProvider = require('./userProvider');
const { imageUploader } = require('../../middlewares/image.uploader');

//사용자 조회

//사용자 권한 조회
exports.getAllUsersRole = async () => {
    try {
        const users = await userProvider.getAllUsersRole();
        const roleData = await Promise.all(
            users.map(async (user) => {
                return {
                    id: user.id,
                    name: user.name,
                    role: {
                        id: user.roleId,
                        roleName: user.Role.roleName,
                    },
                };
            })
        );
        return response(baseResponse.SUCCESS_GET_ROLE, roleData);
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

//프로필 사진 변경하기
exports.changeProfileImage = async (userId, profileImg) => {
    try {
        const user = await userProvider.findExistUser(userId);
        if (!user) {
            return errResponse(baseResponse.MEMBER_NOT_FOUND);
        }
        // //S3에 이미지 업로드하기
        // const uploadImg = await new Promise((resolve, reject) => {
        //     imageUploader.single('profileImage')(profileImg, {}, (err) => {
        //         if (err) {
        //             return reject(new Error(baseResponse.BAD_REQUEST));
        //         }
        //         if (!profileImg) {
        //             return reject(new Error(baseResponse.BAD_REQUEST));
        //         }
        //         resolve(profileImg.location);
        //     });
        // });
        const newProfileImage = await userProvider.changeProfileImage(user.id, profileImg.location);
        return response(baseResponse.SUCCESS_CHANGE_PROFILE_IMG);
    } catch (error) {
        console.error(error);
        throw new Error(baseResponse.INTERNAL_SERVER_ERROR);
    }
};
