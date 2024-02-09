const noticeProvider = require('./notice.provider.js');
const noticeService = require('./notice.service.js');
const status = require('../../config/response.status.js');
const { response, errResponse } = require('../../config/response.js');
const url = require('url');

exports.noticeCreate = async (req, res, next) => {
    try {
        const image = req.files;
        const path = image.map(img => img.location);
        if (image === undefined) {
            return res.status(400).json({ success: false, message: "실패" });
        } else {
            res.status(200).json({ success: true, message: "성공" });
        }
        const newNotice = await noticeService.createNotice(typeof req.body.data === 'object' ? req.body.data : JSON.parse(req.body.data), path);
        return res.send(response(status.SUCCESS, newNotice));
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

exports.noticeEdit = async (req, res, next) => {
    try {
        const noticeId = req.params.id;
        const image = req.files;
        const path = image ? image.map(img => img.location) : [];

        const updatedNotice = await noticeService.modifyNotice(noticeId, typeof req.body.data === 'object' ? req.body.data : JSON.parse(req.body.data), path);
        
        res.send(response(status.SUCCESS, updatedNotice));
    } catch (error) {
        console.error('Error modifying notice:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.noticeDelete = async (req, res, next) => {
    try {
        const noticeId = req.params.id;
        // 삭제된 공지사항 정보 반환
        const deletedNotice = await noticeService.deleteNotice(noticeId, req.query);

        // 성공 응답
        return res.send(response(status.SUCCESS, deletedNotice));
    } catch (error) {
        console.error('Error in controller - deleteNotice:', error);
        // 실패 응답
        res.status(400).json({ success: false, message: error.message });
    }
};