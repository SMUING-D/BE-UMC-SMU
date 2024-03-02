const projectProvider = require('./project.provider.js');
const projectService = require('./project.service.js');
const status = require('../../config/response.status.js');
const { response, errResponse } = require('../../config/response.js');
const url = require('url');

exports.projectCreate = async (req, res, next) => {
    try {
        const roleId = res.locals.decoded.roleId;
        const image = req.files;
        const path = image.map(img => img.location);
        if (!image || image.length === 0) {
            return res.status(400).json({ success: false, message: "실패" });
        }
        const newProject = await projectService.createProject(roleId, typeof req.body.data === 'object' ? req.body.data : JSON.parse(req.body.data), path);
        
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

exports.projectMember = async (req, res, next) => {
    try {
        const period = req.params.period;
        const getMember = await projectProvider.getMember(period);
        return res.send(response(status.SUCCESS, getMember));
    } catch (error) {
        console.error('Error controler member:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.projectEdit = async (req, res, next) => {
    try {
        const roleId = res.locals.decoded.roleId;
        const projectId = req.params.id;
        const image = req.files;
        const path = image ? image.map(img => img.location) : [];

        const updatedProject = await projectService.modifyProject(roleId, projectId, typeof req.body.data === 'object' ? req.body.data : JSON.parse(req.body.data), path);
        
        res.send(response(status.SUCCESS, updatedProject));
    } catch (error) {
        console.error('Error modifying project:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.projectDelete = async (req, res, next) => {
    try {
        const roleId = res.locals.decoded.roleId;
        const projectId = req.params.id;
        // 삭제된 프로젝트 정보 반환
        const deleteProject = await projectService.deleteProject(roleId, projectId);

        // 성공 응답
        return res.send(response(status.SUCCESS, deleteProject));
    } catch (error) {
        console.error('Error in controller - deleteProject:', error);
        // 실패 응답
        res.status(400).json({ success: false, message: error.message });
    }
};