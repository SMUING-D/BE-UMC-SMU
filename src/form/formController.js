const formService = require('./formService');
const { response, errResponse } = require('../../config/response');
const baseResponse = require('../../config/response.status');

exports.createForm = async (req, res, next) => {
    try {
        const user = res.locals.decoded;
        const { title, questions } = req.body;
        console.log(req.body, user.id);
        const result = await formService.createForm(user.userId, { title, questions });
        return res.send(result);
    } catch (error) {
        console.error(error);
        next(error);
    }
};
