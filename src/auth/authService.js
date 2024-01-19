const bcrypt = require('bcrypt');
const User = require('../../models/users');
const Role = require('../../models/role');
const { status } = require('../config/response.status.js');

async function join(studentId, name, password, nickname, major, email) {
    try {
        // 필수 정보 누락 여부 체크
        if (!studentId || !name || !password || !nickname || !major || !email) {
            throw new Error(status.JOIN_EMPTY.message);
        }

        // 학번 중복 체크
        const existingUser = await UmcUser.findOne({ where: { studentId } });
        if (existingUser) {
            throw new Error(status.MEMBER_ALREADY_EXISTS.message);
        }
        // 학과 정보 확인
        const major = await Major.findByPk(majorId);
        if (!major) {
            throw new Error(status.BAD_REQUEST.message);
        }

        // 비밀번호 조건 확인
        if (!isValidPassword(password)) {
            throw new Error(status.INVALID_PASSWORD_RULES.message);
        }

        // 비밀번호 암호화
        const hashedPassword = await bcrypt.hash(password, 10);

        // 유저 생성
        const newUser = await User.create({
            studentId,
            name,
            password: hashedPassword,
            nickname,
            majorId,
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

//사용자 권한 변경
async function changeUserRole(userId, newRoleId) {
    try {
        // 사용자 확인
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error(status.MEMBER_NOT_FOUND.message);
        }

        // 새로운 역할 확인
        const newRole = await Role.findByPk(newRoleId);
        if (!newRole) {
            throw new Error(status.ROLE_NOT_FOUND.message);
        }

        // 권한 변경
        user.roleId = newRole.id;
        await user.save();

        return user;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    join,
    changeUserRole,
};
