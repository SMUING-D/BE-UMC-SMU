const bcrypt = require('bcrypt');
const authProvider = require('./authProvider');
const emailService = require('../../util/email');
const { encrypt, decrypt } = require('../../util/crypter');
const renderAuthEmail = require('../../views/ejsRender');
const { response, errResponse } = require('../../config/response');
const baseResponse = require('../../config/response.status');

//학번 중복 확인
exports.checkStudentId = async (studentId) => {
    try {
        const user = await authProvider.checkStudentIdExist(studentId);
        if (user === null) {
            return response(baseResponse.USER_CAN_SIGNUP);
        } else {
            return errResponse(baseResponse.MEMBER_ALREADY_EXISTS);
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
};

//회원가입
exports.join = async (userData) => {
    try {
        const { studentId, name, password, nickname, majorName, email } = userData;
        // 필수 정보 누락 여부 체크
        if (!studentId || !name || !password || !nickname || !majorName || !email) {
            return errResponse(baseResponse.JOIN_EMPTY);
        }
        //회원 존재 확인
        const EX_USER = await authProvider.checkStudentIdExist(studentId);
        if (EX_USER) {
            return errResponse(baseResponse.MEMBER_ALREADY_EXISTS);
        }
        // 비밀번호 조건 확인
        if (!isValidPassword(password)) {
            throw new Error(errResponse(baseResponse.INVALID_PASSWORD_RULES.message));
        }
        // 비밀번호 암호화
        const hashedPassword = await bcrypt.hash(password, 10);

        // Major 테이블에서 해당 학과 찾기
        const major = await authProvider.findMajorByName(majorName);

        // 유저 생성
        const newUser = await authProvider.createUser({
            studentId,
            name,
            password: hashedPassword,
            email,
            nickname,
            majorId: major.id,
        });
        return response(baseResponse.SUCCESS_REGISTRATION, newUser);
    } catch (error) {
        console.error(error);
        next(error);
    }
};
//로그인
exports.login = async (studentId, password) => {
    try {
        //학번 일치 확인
        const user = await this.checkStudentId(studentId);
        if (user === null) {
            return errResponse(baseResponse.MEMBER_NOT_FOUND);
        }
        if (user.password === null) {
            return errResponse(baseResponse.MEMBER_NOT_FOUND);
        }
        //비밀번호 일치 확인
        const passwordHash = await bcrypt.hash(password, 10);
        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            return errResponse(baseResponse.WRONG_PASSWORD);
        }
        const aToken = jwtUtil.signAToken(user.id);
        const rToken = await jwtUtil.signRToken(user.id);
        return response(baseResponse.SUCCESS_LOGIN);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

//

//이메일 보내기
exports.sendVerificationEmail = async (studentId) => {
    try {
        // 이메일 인증 랜덤 코드 생성
        const AUTH_CODE = generateRandomCode(10);
        const saveCode = await authProvider.saveVerificationCode(studentId, AUTH_CODE);
        console.log('코드:', saveCode);
        console.log('authcode', AUTH_CODE);
        // 이메일 인증 링크 생성
        const AUTH_URL = generateAuthUrl(studentId, AUTH_CODE);
        // 이메일 렌더링
        const AUTH_HTML = await renderAuthEmail.renderAuthEmail(AUTH_URL);
        // 이메일 보내기
        const sendMail = emailService.sendVerificationEmail(studentId, '이메일 인증', AUTH_HTML);
        console.log('메일보내기:', sendMail);
        return response(baseResponse.SUCCESS_EMAIL_SEND);
    } catch (error) {
        console.error('Send Email Error: ' + error.message);
        throw new Error(errResponse(baseResponse.FAILED_EMAIL_SEND));
    }
};

// 이메일 인증
exports.verifyEmail = async (code) => {
    try {
        if (!code) {
            throw new Error(errResponse(baseResponse.INVALID_EMAIL_VERIFICATION_CODE));
        }

        //코드 일치 확인
        const [studentId, verificationCode] = code.split('&&');

        //사용자 확인
        const user = await authProvider.findUserByOptions(studentId, verificationCode);
        if (!user) {
            return errResponse(baseResponse.MEMBER_NOT_FOUND);
        }

        //인증 상태 업데이트
        const updateVerificationStatus = await authProvider.updateVerificationStatus(studentId);

        if (!updateVerificationStatus) {
            return errResponse(baseResponse.FAILED_EMAIL_VERIFICATION);
        }

        return response(baseResponse.SUCCESS_EMAIL_VERIFICATION);
    } catch (error) {
        console.error(error);
    }
};

//비밀번호 찾기
exports.findPassword = async (studentId) => {
    try {
        //학번으로 사용자 조회
        const user = await authProvider.checkStudentIdExist(studentId);
        if (!user) {
            return errResponse(baseResponse.MEMBER_NOT_FOUND);
        }

        //임시 비밀번호 생성
        const temporaryPw = generateRandomCode(8);
        const TEMPORARY_PW_HASH = await bcrypt.hash(temporaryPw, 8);
        //기존 비밀번호 임시 비밀번호로 변경
        const updatePassword = await authProvider.updatePassword(TEMPORARY_PW_HASH, studentId);
        if (!updatePassword) {
            return errResponse(baseResponse.BAD_REQUEST);
        }
        //임시 비밀번호 메일 보내기
        const TEMPORARY_PW_EMAIL_HTML = await renderAuthEmail.rendertemporaryPwEmail(temporaryPw);
        const sendMail = await emailService.sendVerificationEmail(studentId, '임시비밀번호', TEMPORARY_PW_EMAIL_HTML);
        console.log('메일보내기:', sendMail);
        return response(baseResponse.SUCCESS_EMAIL_SEND);
    } catch (error) {
        console.error(error);
    }
};

//비밀번호 확인
exports.checkPassword = async (now_user, password) => {
    try {
        const user = await authProvider.checkUserExistByUserId(now_user);
        if (!user) {
            return errResponse(baseResponse.MEMBER_NOT_FOUND);
        }
        //입력 비밀번호화 DB 비밀번호 비교
        const isEqual = await bcrypt.compare(password, user.password);
        if (isEqual === false) {
            return errResponse(baseResponse.WRONG_PASSWORD);
        }
        return response(baseResponse.CHECK_PASSWORD);
    } catch (error) {
        return next(error);
    }
};
exports.changePassword = async (userId, newPassword, confirmPassword) => {
    try {
        const user = await authProvider.checkUserExistByUserId(userId);
        if (!user) {
            return errResponse(baseResponse.MEMBER_NOT_FOUND);
        }

        //빈 값인지 확인
        if (!newPassword || !confirmPassword) {
            return errResponse(baseResponse.JOIN_EMPTY);
        }
        // 새로운 비밀번호가 이전 비밀번호와 일치하는지 확인
        const isEqual = await bcrypt.compare(newPassword, user.password);
        if (isEqual) {
            return errResponse(baseResponse.SAME_WITH_PREVIOUS_PASSWORD);
        }
        // 비밀번호 조건 확인
        if (!isValidPassword(newPassword)) {
            return errResponse(baseResponse.INVALID_PASSWORD_RULES.message);
        }

        // 새로운 비밀번호와 비밀번호 확인이 일치하는지 확인
        if (newPassword !== confirmPassword) {
            return errResponse(baseResponse.WRONG_PASSWORD);
        }

        // 비밀번호 암호화
        const hashNewPassword = await bcrypt.hash(newPassword, 10);
        await authProvider.updatePassword(hashNewPassword, user.studentId);
        return response(baseResponse.SUCCESS_CHANGE_PASSWORD);
    } catch (error) {
        return next(error);
    }
};

//비밀번호 유효성 검사
const isValidPassword = async (password) => {
    // 비밀번호는 8자 이상, 영문 + 숫자 혼합
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
};

//랜덤코드 생성
const generateRandomCode = (digit) => {
    let randomCode = '';
    for (let i = 0; i < digit; i++) {
        randomCode += Math.floor(Math.random() * 10);
    }
    return randomCode;
};

// //임시비밀번호 생성
// const generateTemporaryPw = () => {
//     const temporaryPw = generateRandomCode(8);
//     const TEMPORARY_PW_HASH = bcrypt.hash(temporaryPw, 8);
//     return TEMPORARY_PW_HASH;
// };

//인증링크 생성
const generateAuthUrl = (studentId, randomCode) => {
    const AUTH_QUERY = `${studentId}&&${randomCode}`;
    // const CRYPTED_QUERY = encrypt(AUTH_QUERY, process.env.AUTH_QUERY_SECRET_KEY);
    // const ENCODED_QUERY = encodeURIComponent(CRYPTED_QUERY);
    const ENCODED_QUERY = encodeURIComponent(AUTH_QUERY);
    const LINK_DOMAIN = 'http://localhost:3000'; //서버 열면 변경
    return `${LINK_DOMAIN}/auth/auth_email?code=${ENCODED_QUERY}`;
};
