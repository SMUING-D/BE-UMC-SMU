const response = ({ isSuccess, code, message }, result) => {
    return {
        isSuccess: isSuccess,
        code: code,
        message: message,
        result: result,
    };
};

const errResponse = ({ isSuccess, code, message }) => {
    return {
        isSuccess: isSuccess,
        code: code,
        message: message,
    };
};

const getSuccessSignInJson = (userId, aToken, rToken, expiresIn) => {
    return {
        status_code: 200,
        message: '로그인이 성공했습니다.',
        user_id: userId,
        access_token: aToken,
        refresh_token: rToken,
        refresh_token_expires_in: expiresIn,
    };
};

module.exports = { response, errResponse, getSuccessSignInJson };
