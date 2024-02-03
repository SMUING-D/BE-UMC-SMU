const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET;

exports.generateJwtToken = (email) => {
    const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });
    return token;
};

exports.verifyAToken = (req, res, next) => {
    if (!req.headers.authorization) return res.status(JWT_TOKEN_NOT_FOUND.status_code).json(JWT_TOKEN_NOT_FOUND.res_json);

    try {
        const decoded = jwt.verify(req.headers.authorization, secretKey);
        res.locals.decoded = decoded;
        return next();
    } catch (error) {
        //logger.error(error);
        if (error.name === 'TokenExpiredError') {
            // 유효 기간 초과
            return res.status(JWT_TOKEN_EXPIRED.status_code).json(JWT_TOKEN_EXPIRED.res_json);
        } else {
            // 잘못된 토큰
            return res.status(JWT_TOKEN_WRONG.status_code).json(JWT_TOKEN_WRONG.res_json);
        }
    }
};
