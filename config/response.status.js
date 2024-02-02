const { StatusCodes } = require('http-status-codes');

export const status = {
    // success
    SUCCESS: { isSuccess: true, code: 2000, message: 'success!' },
    USER_CAN_SIGNUP: { isSuccess: true, code: 2001, message: '가입이 가능한 학번입니다.' },
    SUCCESS_REGISTRATION: { isSuccess: true, code: 2002, message: '회원가입이 성공적으로 완료되었습니다.' },
    SUCCESS_CREATE_NOTICE: { isSuccess: true, code: 2002, message: '공지사항이 성공적으로 작성되었습니다.' },

    // error
    // common err
    INTERNAL_SERVER_ERROR: {status: StatusCodes.INTERNAL_SERVER_ERROR, "isSuccess": false, "code": "COMMON000", "message": "서버 에러, 관리자에게 문의 바랍니다." },
    BAD_REQUEST: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "COMMON001", "message": "잘못된 요청입니다." },
    UNAUTHORIZED: {status: StatusCodes.UNAUTHORIZED, "isSuccess": false, "code": "COMMON002", "message": "권한이 잘못되었습니다." },
    METHOD_NOT_ALLOWED: {status: StatusCodes.METHOD_NOT_ALLOWED, "isSuccess": false, "code": "COMMON003", "message": "지원하지 않는 Http Method 입니다." },
    FORBIDDEN: {status: StatusCodes.FORBIDDEN, "isSuccess": false, "code": "COMMON004", "message": "금지된 요청입니다." },
    NOT_FOUND: {status: StatusCodes.NOT_FOUND, "isSuccess": false, "code": "COMMON005", "message": "요청한 페이지를 찾을 수 없습니다. 관리자에게 문의 바랍니다." },

    //notice, project err
    ACCESS_DENIED: { status: StatusCodes.BAD_REQUEST, isSuccess: false, code: 'NOTICE4001', message: '작성 권한이 없습니다.' },
    PARAMETER_IS_EMPTY: { status: StatusCodes.BAD_REQUEST, isSuccess: false, code: 'NOTICE4002', message: '필수 내용이 누락되었습니다.' },
    CREATION_FAILED: { status: StatusCodes.BAD_REQUEST, isSuccess: false, code: 'NOTICE4003', message: '생성을 실패하였습니다.' },
};