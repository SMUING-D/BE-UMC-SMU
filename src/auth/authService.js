const bcrypt = require('bcrypt');
const Major = require('../../models/major');
const umcUser = require('../../models/umcUser');
const emailService = require('../../util/email');
const { encrypt, decrypt } = require('../../util/crypter');
const renderAuthEmail = require('../../views/ejsRender');
const { status } = require('../../config/response.status');

const checkStudentIdExist = async (studentId) => {
    const EX_USER = await umcUser.findOne({ where: { studentId: studentId } });
    if (EX_USER) return EX_USER;
    else return null;
};

//major 선택
const findMajors = async (majorName) => {
    const majors = await Major.findAll({ where: { majorName } });
    if (majors) return majors;
    else return null;
};

//비밀번호 유효성 검사
const isValidPassword = async (password) => {
    // 비밀번호는 8자 이상, 영문 + 숫자 혼합
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
};

const generateRandomCode = (digit) => {
    let randomCode = '';
    for (let i = 0; i < digit; i++) {
        randomCode += Math.floor(Math.random() * 10);
    }
    return randomCode;
};

const generateAuthUrl = (studentId, randomCode) => {
    const AUTH_QUERY = `${studentId}&&${randomCode}`;
    // const CRYPTED_QUERY = encrypt(AUTH_QUERY, process.env.AUTH_QUERY_SECRET_KEY);
    // const ENCODED_QUERY = encodeURIComponent(CRYPTED_QUERY);
    const LINK_DOMAIN = 'http://localhost:3000'; //서버 열면 변경
    return `${LINK_DOMAIN}/auth/auth_email?code=${AUTH_QUERY}`;
};

exports.checkStudentId = async (req, res, next) => {
    try {
        if (!req.headers.studentId) {
            return res.status(status.BAD_REQUEST.status).json(status.BAD_REQUEST);
        }

        const USER_INFO = await checkStudentIdExist(req.headers.studentId);
        if (USER_INFO === null) {
            return res.status(status.USER_CAN_SIGNUP.status).json(status.USER_CAN_SIGNUP);
        } else {
            return res.status(status.MEMBER_ALREADY_EXISTS.status).json(status.MEMBER_ALREADY_EXISTS);
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};

exports.join = async (req, res, next) => {
    const { studentId, name, password, nickname, majorName, email } = req.body;
    try {
        // 필수 정보 누락 여부 체크
        if (!studentId || !name || !password || !nickname || !majorName || !email) {
            return res.status(status.JOIN_EMPTY.status).json(status.JOIN_EMPTY);
        }
        //회원 존재 확인
        const EX_USER = await checkStudentIdExist(studentId);
        if (EX_USER) {
            return res.status(status.MEMBER_ALREADY_EXISTS.status).json(status.MEMBER_ALREADY_EXISTS);
        }
        // 비밀번호 조건 확인
        if (!isValidPassword(password)) {
            throw new Error(status.INVALID_PASSWORD_RULES.message);
        }
        // 비밀번호 암호화
        const hashedPassword = await bcrypt.hash(password, 10);

        // Major 테이블에서 해당 학과 찾기
        const major = await findMajors(majorName);
        // 유저 생성
        const newUser = await umcUser.create({
            studentId,
            name,
            password: hashedPassword,
            email,
            nickname,
            majorId: major.id,
        });

        //이메일 인증 랜덤 코드 생성
        const AUTH_CODE = generateRandomCode(10);
        console.log('code', AUTH_CODE);
        //이메일 인증 링크 생성 및 렌더링
        const AUTH_URL = generateAuthUrl(studentId, AUTH_CODE);
        console.log('url', AUTH_URL);
        const AUTH_HTML = await renderAuthEmail.renderAuthEmail(AUTH_URL);
        const sendEmail = emailService.sendVerificationEmail(studentId, AUTH_HTML);
        console.log('이메일 보내기', sendEmail);
        res.status(status.SUCCESS.status).json(status.SUCCESS); // 회원가입 성공 응답
    } catch (error) {
        console.error(error);
        next(error);
    }
};
// 이메일 인증
exports.verifyEmail = async (req, res, next) => {
    const { studentId, code } = req.query;
    try {
        if (!studentId || !code) {
            return res.status(status.INVALID_REQUEST.status).json(status.INVALID_REQUEST);
        }

        // 이메일 인증 로직 추가
        const decodedCode = decodeURIComponent(code);
        const authQueryArray = decrypt(decodedCode, process.env.AUTH_QUERY_SECRET_KEY).split('&&');
        const urlStudentId = authQueryArray[0];

        if (studentId !== urlStudentId) {
            return res.status(status.INVALID_REQUEST.status).json(status.INVALID_REQUEST);
        }

        // 이메일 인증에 성공하면 응답으로만 처리
        res.status(status.SUCCESS.status).json(status.SUCCESS);
    } catch (error) {
        throw error;
    }
    next(error);
};
