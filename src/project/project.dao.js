const BaseError = require('../../config/error.js');
const status = require('../../config/response.status.js');
const Project = require('../../models/project.js');
const Image = require('../../models/image.js');
const User = require('../../models/umcUser.js');
const ProjectUser = require('../../models/projectUser.js');
const Member = require('../../models/umcMember.js');

exports.addProject = async (body) => {
    try{
        //프로젝트 생성
        const newProject = await Project.create(body);
        return newProject;
    }catch (err) {
        console.error('Error creating project:', err);
        throw new BaseError(status.CREATION_FAILED);
    }
}

exports.addProjectUser = async (body) => {
    try{
        const newProjectUser = await ProjectUser.create(body);
        return newProjectUser;
    }catch (err) {
        console.error('Error creating projectUser:', err);
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

exports.updateProject = async (projectId, body) => {
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
        // 기존에 데이터베이스에 연결된 projectId에 해당하는 이미지를 모두 삭제
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

exports.updateProjectUsers = async (period, projectId, member) => {
    try {
        // 기존에 데이터베이스에 연결된 projectId에 해당하는 유저를 모두 삭제
        await ProjectUser.destroy({
            where: { projectId: projectId },
        });

        // 새로운 유저들을 추가
        const newProjectUser = member.map(user_id => ({
            userId: user_id,
            projectId: projectId
        }));

        await ProjectUser.bulkCreate(newProjectUser);

        //실제 멤버 데이터 불러오기
        const updatedProjectUser = await Promise.all(newProjectUser.map(async (project_user) => {
            //기수가 5기 이하면 예전 멤버 데이터에서 가져오고 6기부터는 현재 유저 데이터에서 가져오기
            const user = 
            period < 6 ? await Member.findOne({
                where: {
                    id: project_user.userId
                }
            })
            : await User.findOne({
                where: {
                    id: project_user.userId
                }
            });
            // console.log(user.dataValues);
            return user.dataValues;
        }));

        return updatedProjectUser;
    } catch (error) {
        throw error;
    }
};

exports.deleteProject = async (projectId) => {
    try {
        // 삭제된 프로젝트 정보를 가져오고 프로젝트를 삭제
        const deletedProject = await Project.findByPk(projectId);
        await Project.destroy({ where: { id: projectId } });
        await Image.destroy({ where: { contentId: projectId, directory: 'project' } });
        await ProjectUser.destroy({ where: { projectId: projectId } });

        return deletedProject;
    } catch (error) {
        throw error;
    }
};