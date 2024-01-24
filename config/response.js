module.exports.response = function ({ isSuccess, code, message }, result) {
    return {
        isSuccess: isSuccess,
        code: code,
        message: message,
        result: result,
    };
};
