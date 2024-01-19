const bcrypt = require('bcrypt');
const User = require('../../models/users');

async function join(studentId, name, password, nickname, major, email) {
    try {
        // 학번 중복 체크
        const existingUser = await UmcUser.findOne({ where: { studentId } });
        if (existingUser) {
            throw new Error('Student ID is already registered.');
        }

        // 비밀번호 조건 확인
        if (!isValidPassword(password)) {
            throw new Error('Invalid password format.');
        }

        // 비밀번호 암호화
        const hashedPassword = await bcrypt.hash(password, 10);

        // 유저 생성
        const newUser = await User.create({
            studentId,
            name,
            password: hashedPassword,
            nickname,
            major,
            email,
        });

        return newUser;
    } catch (error) {
        throw error;
    }
}

function isValidPassword(password) {
    // 비밀번호는 8자 이상, 영문 + 숫자 혼합
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
}

module.exports = {
    join,
};
