const { StatusCodes } = require('http-status-codes');

module.exports = {
    status: {
        // success
        SUCCESS: { status: StatusCodes.OK, isSuccess: true, code: 2000, message: 'success!' },
        USER_CAN_SIGNUP: { status: StatusCodes.OK, isSuccess: true, code: 2001, message: '가입이 가능한 학번입니다.' },

        // error
        // common err
        INTERNAL_SERVER_ERROR: {
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            isSuccess: false,
            code: 'COMMON000',
            message: '서버 에러, 관리자에게 문의 바랍니다.',
        },
        BAD_REQUEST: { status: StatusCodes.BAD_REQUEST, isSuccess: false, code: 'COMMON001', message: '잘못된 요청입니다.' },
        UNAUTHORIZED: { status: StatusCodes.UNAUTHORIZED, isSuccess: false, code: 'COMMON002', message: '권한이 잘못되었습니다.' },
        METHOD_NOT_ALLOWED: {
            status: StatusCodes.METHOD_NOT_ALLOWED,
            isSuccess: false,
            code: 'COMMON003',
            message: '지원하지 않는 Http Method 입니다.',
        },
        FORBIDDEN: { status: StatusCodes.FORBIDDEN, isSuccess: false, code: 'COMMON004', message: '금지된 요청입니다.' },
        NOT_FOUND: {
            status: StatusCodes.NOT_FOUND,
            isSuccess: false,
            code: 'COMMON005',
            message: '요청한 페이지를 찾을 수 없습니다. 관리자에게 문의 바랍니다.',
        },
        //jwt err
        JWT_TOKEN_NOT_FOUND: {
            status: StatusCodes.BAD_REQUEST,
            isSuccess: false,
            code: 'JWT000',
            message: '토큰을 찾지 못해 사용자 인증을 할 수 없습니다.',
        },
        JWT_TOKEN_WRONG: {
            status: StatusCodes.BAD_REQUEST,
            isSuccess: false,
            code: 'JWT001',
            message: '잘못된 토큰입니다.',
        },
        JWT_TOKEN_EXPIRED: {
            status: StatusCodes.BAD_REQUEST,
            isSuccess: false,
            code: 'JWT002',
            message: '토큰이 만료되었습니다.',
        },
        JWT_REFRESH_TOKEN_EXPIRED: {
            status: StatusCodes.BAD_REQUEST,
            isSuccess: false,
            code: 'JWT003',
            message: 'Refresh 토큰이 만료되었습니다.',
        },

        // member err
        MEMBER_NOT_FOUND: { status: StatusCodes.BAD_REQUEST, isSuccess: false, code: 'MEMBER4001', message: '사용자가 없습니다.' },
        ROLE_NOT_FOUND: { status: StatusCodes.BAD_REQUEST, isSuccess: false, code: 'MEMBER4002', message: '역할이 없습니다.' },
        NICKNAME_NOT_EXIST: { status: StatusCodes.BAD_REQUEST, isSuccess: false, code: 'MEMBER4003', message: '닉네임은 필수입니다.' },
        JOIN_EMPTY: { status: StatusCodes.BAD_REQUEST, isSuccess: false, code: 'MEMBER4004', message: '필수 정보가 누락되었습니다.' },
        MEMBER_ALREADY_EXISTS: {
            status: StatusCodes.BAD_REQUEST,
            isSuccess: false,
            code: 'MEMBER4005',
            message: '이미 존재하는 회원입니다.',
        },
        INVALID_PASSWORD_RULES: {
            status: StatusCodes.BAD_REQUEST,
            isSuccess: false,
            code: 'MEMBER4006',
            message: '비밀번호는 8자 이상이어야 하며, 영문과 숫자가 섞여 있어야 합니다.',
        },

        // article err
        ARTICLE_NOT_FOUND: { status: StatusCodes.NOT_FOUND, isSuccess: false, code: 'ARTICLE4001', message: '게시글이 없습니다.' },
    },
};
