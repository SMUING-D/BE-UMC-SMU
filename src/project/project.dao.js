const BaseError = require('../../config/error.js');
const status = require('../../config/response.status.js');
const Project = require('../../models/project.js');
const Image = require('../../models/image.js');

exports.addProject = async (body) => {
    try{
        //공지 생성
        const newProject = await Project.create(body);


        return newProject;
    }catch (err) {
        console.error('Error creating project:', err);
        throw new BaseError(status.CREATION_FAILED);
    }
}

exports.addProjectImage = async (body) => {
    try{
        const newProjectImage = await Image.create(body);
        return newProjectImage;
    }catch (err) {
        console.error('Error creating projectImage:', err);
        throw new BaseError(status.CREATION_FAILED);
    }
}

exports.updateProject = async (project, body) => {
    try {
        // 여기에서 필요한 유효성 검사 및 권한 확인 등을 수행할 수 있습니다.

        const [updatedRows] = await Project.update(body, {
            where: { id: projectId },
            returning: true,
        });

        if (updatedRows === 0) {
            throw new BaseError(status.NOT_FOUND);
        }

        const updatedProject = await Project.findByPk(projectId);

        return updatedProject;
    } catch (error) {
        throw error;
    }
};

exports.updateProjectImages = async (projectId, paths) => {
    try {
        // 기존에 데이터베이스에 연결된 noticeId에 해당하는 이미지를 모두 삭제
        await Image.destroy({
            where: { contentId: projectId, directory: 'project' },
        });

        // 새로운 이미지를 추가
        const newImages = paths.map(filePath => ({
            contentId: projectId,
            directory: 'project',
            location: filePath,
        }));

        await Image.bulkCreate(newImages);

        const updatedProjectImg = await Image.findAll({
            attributes: ['location'],
            where: {
                directory: "project",
                contentId: projectId
            },
        });

        return updatedProjectImg;
    } catch (error) {
        throw error;
    }
};

exports.deleteProject = async (projectId) => {
    try {
        // 삭제된 공지사항 정보를 가져오고 공지사항을 삭제
        const deletedProject = await Project.findByPk(projectId);
        await Project.destroy({ where: { id: projectId } });
        await Image.destroy({ where: { contentId: projectId, directory: 'project' } });

        return deletedProject;
    } catch (error) {
        throw error;
    }
};