const userProvider = require('./userProvider');

//사용자 권한 조회
exports.getAllUsersRole = async () => {
    try {
        const usersRole = await userProvider.getAllUsersRole();
        return usersRole;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
