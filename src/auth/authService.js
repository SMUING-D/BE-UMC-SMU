const bcrypt = require('bcrypt');
const User = require('../../models/users');
const { status } = require('../config/response.status.js');
const jwt = require('jsonwebtoken');

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

async function login(studentId, password) {
    try {
        // 필수 정보 누락 여부 체크
        if (!studentId || !password) {
            throw new Error(status.JOIN_EMPTY.message);
        }

        // 사용자 확인
        const user = await User.findOne({ where: { studentId } });
        if (!user) {
            throw new Error(status.MEMBER_NOT_FOUND.message);
        }

        // 비밀번호 확인
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new Error(status.INVALID_PASSWORD_RULES.message);
        }

        // JWT 토큰 생성
        const accessToken = generateAccessToken(user.id);

        return { user, accessToken };
    } catch (error) {
        throw error;
    }
}

function generateAccessToken(userId) {
    const payload = {
        id: userId,
    };

    return jwt.sign(payload, process.env.JWT_SECRET, {
        algorithm: process.env.JWT_SIGN_ALGORITHM,
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRESIN,
    });
}

module.exports = {
    join,
    login,
};
