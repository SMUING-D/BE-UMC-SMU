const { StatusCodes } = require('http-status-codes');

module.exports = {
    // success
    SUCCESS: { isSuccess: true, code: 2000, message: 'success!' },
    USER_CAN_SIGNUP: { isSuccess: true, code: 2001, message: '가입이 가능한 학번입니다.' },
    SUCCESS_REGISTRATION: { isSuccess: true, code: 2002, message: '회원가입이 완료되었습니다.' },
    SUCCESS_EMAIL_SEND: { isSuccess: true, code: 2002, message: '인증 메일 전송 성공!' },
    SUCCESS_EMAIL_VERIFICATION: { isSuccess: true, code: 2002, message: '메일 인증에 성공했습니다.' },
    SUCCESS_UPDATE_ROLE: { isSuccess: true, code: 2003, message: '권한을 변경했습니다.' },
    SUCCESS_GET_ROLE: { isSuccess: true, code: 2002, message: '권한을 불러왔습니다.' },
    SUCCESS_CHANGE_PASSWORD: { isSuccess: true, code: 2007, message: '비밀번호가 변경되었습니다.' },
    SUCCESS_CHANGE_NICKNAME: { isSuccess: true, code: 2007, message: '닉네임이 변경되었습니다.' },
    SUCCESS_CHANGE_PROFILE_IMG: { isSuccess: true, code: 2007, message: '프로필 사진이 변경되었습니다.' },
    CHECK_PASSWORD: { isSuccess: true, code: 2006, message: '비민번호가 확인되었습니다.' },
    SUCCESS_CREATE_NOTICE: { isSuccess: true, code: 2002, message: '공지사항이 성공적으로 작성되었습니다.' },
    SUCCESS_LOGIN: { isSuccess: true, code: 2008, message: '로그인되었습니다.' },
    SUCCESS_CREATE_FORM: { isSuccess: true, code: 2002, message: '지원서가 생성되었습니다.' },
    SUCCESS_UPDATE_FORM: { isSuccess: true, code: 2002, message: '지원서가 수정되었습니다.' },
    SUCCESS_GET_FORM: { isSuccess: true, code: 2002, message: '지원서를 불러왔습니다.' },
    SUCCESS_CREATE_QUESTION: { isSuccess: true, code: 2002, message: '질문이 생성되었습니다.' },
    SUCCESS_SAVE_RESPONSE: { isSuccess: true, code: 2002, message: '답변이 저장되었습니다.' },
    SUCCESS_UPDATE_RESPONSE: { isSuccess: true, code: 2002, message: '답변이 수정되었습니다.' },
    SUCCESS_SUBMIT_RESPONSE: { isSuccess: true, code: 2002, message: '답변이 제출되었습니다.' },
    SUCCESS_UPDATE_STATUS: { isSuccess: true, code: 2007, message: '상태가 변경되었습니다.' },

    // error

    // common err
    INTERNAL_SERVER_ERROR: { isSuccess: false, code: 'COMMON000', message: '서버 에러, 관리자에게 문의 바랍니다.' },
    BAD_REQUEST: { isSuccess: false, code: 'COMMON001', message: '잘못된 요청입니다.' },
    UNAUTHORIZED: { isSuccess: false, code: 'COMMON002', message: '권한이 잘못되었습니다.' },
    METHOD_NOT_ALLOWED: { isSuccess: false, code: 'COMMON003', message: '지원하지 않는 Http Method 입니다.' },
    FORBIDDEN: { isSuccess: false, code: 'COMMON004', message: '금지된 요청입니다.' },
    NOT_FOUND: { isSuccess: false, code: 'COMMON005', message: '요청한 페이지를 찾을 수 없습니다. 관리자에게 문의 바랍니다.' },
    WRONG_EXTENSION: { status: StatusCodes.WRONG_EXTENSION, isSuccess: false, code: 'COMMON006', message: '잘못된 확장자입니다.' },

    //jwt
    JWT_TOKEN_NOT_FOUND: { isSuccess: false, code: 'JWT000', message: '토큰을 찾지 못해 사용자 인증을 할 수 없습니다.' },
    JWT_TOKEN_WRONG: { isSuccess: false, code: 'JWT001', message: '잘못된 토큰입니다.' },
    JWT_TOKEN_EXPIRED: { isSuccess: false, code: 'JWT002', message: '토큰이 만료되었습니다.' },
    JWT_REFRESH_TOKEN_EXPIRED: { isSuccess: false, code: 'JWT002', message: 'Refresh 토큰이 만료되었습니다.' },

    JWT_GET_ACCESS_TOKEN_SUCCESS: { isSuccess: true, code: 'JWT003', message: 'Access 토큰이 발급되었습니다. ' },
    JWT_GET_REFRESH_TOKEN_SUCCESS: { isSuccess: true, code: 'JWT003', message: 'Refresh 토큰이 발급되었습니다. ' },

    // member err
    MEMBER_NOT_FOUND: { isSuccess: false, code: 'MEMBER4001', message: '사용자가 없습니다.' },
    ROLE_NOT_FOUND: { isSuccess: false, code: 'MEMBER4002', message: '역할이 없습니다.' },
    NICKNAME_NOT_EXIST: { isSuccess: false, code: 'MEMBER4003', message: '닉네임은 필수입니다.' },
    IS_REQUIRED_EMPTY: { isSuccess: false, code: 'MEMBER4004', message: '필수 정보가 누락되었습니다.' },
    MEMBER_ALREADY_EXISTS: { isSuccess: false, code: 'MEMBER4005', message: '이미 존재하는 회원입니다.' },
    INVALID_PASSWORD_RULES: {
        isSuccess: false,
        code: 'MEMBER4006',
        message: '비밀번호는 8자 이상이어야 하며, 영문,숫자,기호가 섞여 있어야 합니다.',
    },
    WRONG_PASSWORD: { isSuccess: false, code: 'MEMBER4007', message: '비밀번호가 틀렸습니다.' },
    SAME_WITH_PREVIOUS_PASSWORD: {
        isSuccess: false,
        code: 'MEMBER4008',
        message: '변경하려는 비밀번호가 전에 사용하던 비밀번호와 같습니다.',
    },
    FAILED_EMAIL_SEND: { isSuccess: false, code: 'MEMBER4009', message: '메일 전송에 실패했습니다.' },
    INVALID_EMAIL_VERIFICATION_CODE: { isSuccess: false, code: 'MEMBER4010', message: '유효하지 않은 코드입니다.' },
    FAILED_EMAIL_VERIFICATION: { isSuccess: false, code: 'MEMBER4011', message: '메일 인증에 실패했습니다.' },

    //form err
    FORM_NOT_FOUND: { isSuccess: false, code: 'FORM4001', message: '지원서가 없습니다' },
    SUBMITTED_FORM_ALREADY_EXISTS: { isSuccess: false, code: 'FORM4002', message: '지원서를 이미 제출했습니다.' },
    PART_NOT_FOUND: { isSuccess: false, code: 'FORM4003', message: '역할이 없습니다' },

    // article err
    ARTICLE_NOT_FOUND: { isSuccess: false, code: 'ARTICLE4001', message: '게시글이 없습니다.' },

    //notice, project err
    ACCESS_DENIED: { status: StatusCodes.BAD_REQUEST, isSuccess: false, code: 'NOTICE4001', message: '작성 권한이 없습니다.' },
    PARAMETER_IS_EMPTY: { status: StatusCodes.BAD_REQUEST, isSuccess: false, code: 'NOTICE4002', message: '필수 내용이 누락되었습니다.' },
    CREATION_FAILED: { status: StatusCodes.BAD_REQUEST, isSuccess: false, code: 'NOTICE4003', message: '생성을 실패하였습니다.' },
};
