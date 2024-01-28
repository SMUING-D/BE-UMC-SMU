// userProvider.js
const User = require('../../models/umcUser');
const Role = require('../../models/role');

// 사용자 권한 조회
exports.getAllUsersRole = async () => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'name', 'roleId'],
            include: [{ model: Role, attributes: ['roleName'] }],
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
