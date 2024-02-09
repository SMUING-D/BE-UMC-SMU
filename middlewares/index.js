const jwt = require('jsonwebtoken');
const { response, errResponse, getSuccessSignInJson } = require('../config/response');
const baseResponse = require('../config/response.status');

exports.verifyAToken = (req, res, next) => {
    if (!req.headers.authorization) return res.send(errResponse(baseResponse.JWT_TOKEN_WRONG));

    try {
        const decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        res.locals.decoded = decoded;
        return next();
    } catch (error) {
        //logger.error(error);
        if (error.name === 'TokenExpiredError') {
            // 유효 기간 초과
            return res.send(errResponse(baseResponse.JWT_ACCESS_TOKEN_EXPIRESIN));
        } else {
            // 잘못된 토큰
            return res.send(errResponse(baseResponse.JWT_TOKEN_WRONG));
        }
    }
};
