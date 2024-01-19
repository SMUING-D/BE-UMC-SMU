const auth = require('src/auth/auth');

exports.joinUser = async (req, res) => {
    const { studentId, name, password, nickname, major, email } = req.body;
    try {
        const newUser = await auth.registerUser(studentId, name, password, nickname, major, email);
        res.json({ success: true, user: newUser });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
