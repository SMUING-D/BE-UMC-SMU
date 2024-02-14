const responseService = require('./responseService');

exports.saveResponses = async (req, res, next) => {
    try {
        const user = res.locals.decoded;
        const { formId } = req.params;
        const { responses } = req.body;
        const result = await responseService.saveResponses(user.userId, formId, responses);
        return res.send(result);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.submitResponse = async (req, res, next) => {
    try {
        const user = res.locals.decoded;
        const { formId, responses } = req.body;
        const result = await responseService.submitResponse(user.userId, formId, responses);
        return res.send(result);
    } catch (error) {
        console.error(error);
        next(error);
    }
};
