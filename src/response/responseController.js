const responseService = require('./responseService');

//학번 중복 확인 요청
exports.saveResponse = async (req, res, next) => {
    try {
        const user = res.locals.decoded;
        const { responses } = req.body;
        const result = await responseService.saveResponse(user.userId, responses);
        return res.send(result);
    } catch (error) {
        console.error(error);
        next(error);
    }
};
