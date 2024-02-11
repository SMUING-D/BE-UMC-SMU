const formService = require('./formService');
const { response, errResponse } = require('../../config/response');
const baseResponse = require('../../config/response.status');

exports.createForm = async (req, res, next) => {
    try {
        const user = res.locals.decoded.user;
        const { title, questions } = req.body;
        const result = await formService.createForm(user.id, req.body);
        return res.send(result);
    } catch (error) {
        console.error(error);
        next(error);
    }
};
