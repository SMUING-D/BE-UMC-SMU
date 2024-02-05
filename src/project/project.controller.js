const projectProvider = require('./project.provider.js');
const projectService = require('./project.service.js');

exports.projectCreate = async (req, res, next) => {
    try {
        const newProject = await projectService.createNotice(req.body);
        res.json({ success: true, project: newProject });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.projectShow = async (req, res, next) => {
    try {
        const getProject = await projectProvider.getNotice(req.query);
        res.json({ success: true, project: getProject });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};