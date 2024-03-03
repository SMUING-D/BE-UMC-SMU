const formService = require('./formService');
const { response, errResponse } = require('../../config/response');
const baseResponse = require('../../config/response.status');

exports.createForm = async (req, res, next) => {
    try {
        const user = res.locals.decoded;
        const { title, year, questions } = req.body;
        console.log(req.body, user.id);
        const result = await formService.createForm(user.userId, { title, year, questions });
        return res.send(result);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.updateForm = async (req, res, next) => {
    try {
        const user = res.locals.decoded;
        const { formId } = req.params;
        const { year, title, questions } = req.body;
        console.log(req.body, user.id);
        const result = await formService.updateForm(user.userId, { formId, year, title, questions });
        return res.send(result);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.getForm = async (req, res, next) => {
    try {
        const user = res.locals.decoded;
        const { formId } = req.params;
        const result = await formService.getForm(user.userId, formId);
        return res.send(result);
    } catch (error) {
        console.error(error);
        next(error);
    }
};
