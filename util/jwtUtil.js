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

    signAToken: (userId, roleId) => {
        const payload = {
            userId: userId,
            roleId: roleId,
        };
        return jwt.sign(payload, process.env.JWT_SECRET, {
            algorithm: process.env.JWT_SIGN_ALGORITHM,
            expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRESIN,
        });
    },

    signRToken: async (userId) => {
        const expiresIn = process.env.JWT_REFRESH_TOKEN_EXPIRESIN;

        const rToken = jwt.sign({}, process.env.JWT_SECRET, {
            algorithm: process.env.JWT_SIGN_ALGORITHM,
            expiresIn: expiresIn,
        });

        // 숫자값과 단위값을 분리 (7d 면 7와 d를 분리)
        const numericValue = parseInt(expiresIn);
        const unit = expiresIn.replace(numericValue.toString(), '');

        const expirationDateTime = moment().add(numericValue, unit).add(9, 'hours').format('YYYY.MM.DD HH:mm:ss');
        redisClient.set(toString(userId), rToken);
        // await User.update({ refresh_token: RToken }, { where: { id: userId } });
        return { refreshToken: rToken, expirationDateTime: expirationDateTime };
    },

    /*verifyAToken -> middlewares.index.js*/

    verifyRToken: async (userId, rToken) => {
        try {
            //redis에서 refreshToken 가져오기
            const getAsync = redisClient.get.bind(redisClient);
            const redisToken = await getAsync(toString(userId));
            if (rToken === redisToken) {
                try {
                    const checktime = jwt.verify(rToken, process.env.JWT_SECRET); //유효 시간 체크
                    console.log('time', checktime);
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
