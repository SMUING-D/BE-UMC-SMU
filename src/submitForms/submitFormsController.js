const submitFormsService = require('./submitFormsService');

exports.getMySubmitForm = async (req, res, next) => {
    try {
        const user = res.locals.decoded;
        const { submitId } = req.body;
        const result = await submitFormsService.getMySubmitForm(user.userId, submitId);
        return res.send(result);
    } catch (error) {
        console.error(error);
        next(error);
    }
};
