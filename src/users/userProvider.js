// userProvider.js
const User = require('../../models/umcUser');
const Role = require('../../models/role');

// 사용자 권한 조회
exports.getAllUsersRole = async () => {
    try {
        const users = await User.findAll({
            // attributes: ['id', 'name', 'roleId'],
            include: [{ model: Role }],
        });
        return users;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// 사용자 권한 변경
exports.updateUserRole = async (userId, newRoleId) => {
    try {
        const updateRole = await User.update(
            { roleId: newRoleId },
            {
                where: { id: userId },
            }
        );
        if (updateRole[0] > 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

//닉네임 변경하기
exports.updateNickname = async (userId, nickname) => {
    try {
        const updateNickname = await User.update(
            { nickname: nickname },
            {
                where: { id: userId },
            }
        );
    } catch (error) {
        console.error(error);
        throw error;
    }
};

//프로필 사진 변경하기
exports.changeProfileImage = async (userId, newProfileImageUrl) => {
    try {
        const updateProfileImage = await User.update(
            {
                profileImgUrl: newProfileImageUrl,
            },
            {
                where: { id: userId },
            }
        );
    } catch (error) {
        console.error(error);
        throw error;
    }
};

//프로필 수정하기
exports.updateProfile = async (userId, profileInfo) => {
    try {
        const profile = await User.update(
            {
                name: profileInfo.name,
                nickname: profileInfo.nickname,
                description: profileInfo.description,
            },
            {
                where: { id: userId },
            }
        );
    } catch (error) {
        console.error(error);
        throw error;
    }
};

//userId로 조회하기
exports.findExistUser = async (userId) => {
    const user = await User.findOne({
        where: {
            id: userId,
        },
    });
    //사용자 미존재
    if (user === null) return false;
    else return user;
};

//운영진인지 확인하기
exports.findExistStaff = async (userId, roleId) => {
    const staff = await User.findOne({
        where: {
            id: userId,
            roleId: roleId,
        },
    });
    return staff;
};
