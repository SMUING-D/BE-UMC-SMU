const noticeProvider = require('./notice.provider.js');
const noticeService = require('./notice.service.js');
const {status} = require('../../config/response.status');
const {response} = require('../../config/response.js');
const url = require('url');

exports.noticeCreate = async (req, res, next) => {
    try {
        const image = req.file;
        const path = image.map(img => img.path);
        if (image === undefined) {
            return res.status(400).json({ success: false, message: "실패" });
        } else {
            res.status(200).json({ success: true, message: "성공" });
        }
        console.log("body", req.body);
        console.log("files", req.file);
        const newNotice = await noticeService.createNotice(req.body);
        return res.send(response(baseResponse.SUCCESS, newNotice));
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.noticeShow = async (req, res, next) => {
    try {
        const getNotice = await noticeProvider.getNotice(url.parse(req.url, true).query);
        return res.send(response(status.SUCCESS, getNotice));
    } catch (error) {
        console.error('Error controler notice:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};