const projectProvider = require('./project.provider.js');
const projectService = require('./project.service.js');
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
        const newProject = await projectService.createProject(typeof req.body.data === 'object' ? req.body.data : JSON.parse(req.body.data), path);
        return res.send(response(status.SUCCESS, newProject));
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.projectShow = async (req, res, next) => {
    try {
        const period = req.params.period;
        const getProject = await projectProvider.getProject(url.parse(req.url, true).query, period);
        return res.send(response(status.SUCCESS, getProject));
    } catch (error) {
        console.error('Error controler project:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.projectEdit = async (req, res, next) => {
    try {
        const projectId = req.params.id;
        const image = req.files;
        const path = image ? image.map(img => img.location) : [];

        const updatedProject = await projectService.modifyProject(projectId, typeof req.body.data === 'object' ? req.body.data : JSON.parse(req.body.data), path);
        
        res.send(response(status.SUCCESS, updatedProject));
    } catch (error) {
        console.error('Error modifying project:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.projectDelete = async (req, res, next) => {
    try {
        const projectId = req.params.id;
        // 삭제된 공지사항 정보 반환
        const deleteProject = await projectService.deleteNotice(projectId, req.query);

        // 성공 응답
        return res.send(response(status.SUCCESS, deleteProject));
    } catch (error) {
        console.error('Error in controller - deleteProject:', error);
        // 실패 응답
        res.status(400).json({ success: false, message: error.message });
    }
};