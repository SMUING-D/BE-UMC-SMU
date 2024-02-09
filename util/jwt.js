const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const moment = require('moment');
const redisClient = require('./redis');
const User = require('../models/umcUser');

module.exports = {
    generateJwtToken: (email) => {
        const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });
        return token;
    },

    signAToken: (userId) => {
        const payload = {
            userId: userId,
        };
        return jwt.sign(payload, process.env.JWT_SECRET, {
            algorithm: process.env.JWT_SIGN_ALGORITHM,
            expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRESIN,
        });
    },

    signRToken: async (userId) => {
        const expiresIn = process.env.JWT_REFRESH_TOKEN_EXPIRESIN;

        const RToken = jwt.sign({}, process.env.JWT_SECRET, {
            algorithm: process.env.JWT_SIGN_ALGORITHM,
            expiresIn: expiresIn,
        });

        // 숫자값과 단위값을 분리 (7d 면 7와 d를 분리)
        const numericValue = parseInt(expiresIn);
        const unit = expiresIn.replace(numericValue.toString(), '');

        const expirationDateTime = moment().add(numericValue, unit).add(9, 'hours').format('YYYY.MM.DD HH:mm:ss');

        await User.update({ refresh_token: RToken }, { where: { id: userId } });
        return { resfreshToken: RToken, expirationDateTime: expirationDateTime };
    },

    /*verifyAToken -> middlewares.index.js*/

    verifyRToken: async (rToken, userId) => {
        const getAsync = promisify(redisClient.get).bind(redisClient);
        try {
            //redis에서 refreshToken 가져오기
            const redisToken = await getAsync(userId);
            if (rToken === redisToken) {
                try {
                    jwt.verify(rToken, process.env.JWT_SECRET); //유효 시간 체크
                    return true;
                } catch (error) {
                    return false;
                }
            } else return false;
        } catch (error) {
            return false;
        }
    },
};
