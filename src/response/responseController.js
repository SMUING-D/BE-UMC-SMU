const responseService = require('./responseService');

exports.saveResponses = async (req, res, next) => {
    try {
        const user = res.locals.decoded;
        // const { formId } = req.params;
        const { formId, responses } = req.body;
        console.log('컨트롤러', formId, responses);
        const result = await responseService.saveResponses(user.userId, formId, responses);
        return res.send(result);
    } catch (error) {
        console.error(error);
        next(error);
    }
};
