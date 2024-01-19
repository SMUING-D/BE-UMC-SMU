import { StatusCodes } from 'http-status-codes';

export const status = {
    // success
    SUCCESS: { status: StatusCodes.OK, isSuccess: true, code: 2000, message: 'success!' },

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

    // member err
    MEMBER_NOT_FOUND: { status: StatusCodes.BAD_REQUEST, isSuccess: false, code: 'MEMBER4001', message: '사용자가 없습니다.' },
    NICKNAME_NOT_EXIST: { status: StatusCodes.BAD_REQUEST, isSuccess: false, code: 'MEMBER4002', message: '닉네임은 필수입니다.' },
    JOIN_EMPTY: { status: StatusCodes.BAD_REQUEST, isSuccess: false, code: 'MEMBER4003', message: '필수 정보가 누락되었습니다.' },
    MEMBER_ALREADY_EXISTS: {
        status: StatusCodes.BAD_REQUEST,
        isSuccess: false,
        code: 'MEMBER4004',
        message: '이미 존재하는 회원입니다.',
    },
    INVALID_PASSWORD_RULES: {
        status: StatusCodes.BAD_REQUEST,
        isSuccess: false,
        code: 'MEMBER4005',
        message: '비밀번호는 8자 이상이어야 하며, 영문과 숫자가 섞여 있어야 합니다.',
    },

    // article err
    ARTICLE_NOT_FOUND: { status: StatusCodes.NOT_FOUND, isSuccess: false, code: 'ARTICLE4001', message: '게시글이 없습니다.' },
};
