// const authService = require('../auth/authService');

// exports.joinUser = async (req, res) => {
//     const { studentId, name, password, nickname, major, email } = req.body;
//     try {
//         const newUser = await authService.registerUser(studentId, name, password, nickname, major, email);
//         res.json({ success: true, user: newUser });
//     } catch (error) {
//         res.status(400).json({ success: false, message: error.message });
//     }
// };
