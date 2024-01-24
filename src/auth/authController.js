// const authService = require('./authService');
// const { status } = require('../config/response.status');

// //사용자 권한 변경 api
// async function changeUserRole(req, res) {
//     const userId = req.params.userId;
//     const newRoleId = req.body.newRoleId; //새로운 역할 ID

//     try {
//         const updatedUser = await authService.changeUserRole(userId, newRoleId);
//         res.json(response(status.SUCCESS, updatedUser));
//     } catch (error) {
//         res.status(400).json(response(status.BAD_REQUEST, null, error.message));
//     }
// }

// module.exports = {
//     changeUserRole,
// };
