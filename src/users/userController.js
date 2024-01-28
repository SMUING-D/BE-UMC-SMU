const userService = require('./userService');

//사용자 권한 조회
exports.getAllUsersRole = async (req, res) => {
    try {
        const result = await userService.getAllUsersRole();
        return res.send(result);
    } catch (error) {
        console.error(error);
    }
};

//사용자 권한 변경 요청
exports.updateUserRole = async (req, res) => {
    try {
        const { userId, newRoleId } = req.body;
        const result = await userService.updateUserRole(userId, newRoleId);
        return res.send(response(baseResponse.SUCCESS, result));
    } catch (error) {
        console.error(error);
    }
};
