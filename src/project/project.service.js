const status = require('../../config/response.status.js');
const projectDao =  require('./project.dao.js');
const authProvider = require('../auth/authProvider.js');
const Member = require('../../models/umcMember.js');

exports.createProject = async (body, path) => {
    const { roleId, title, subTitle, content, github, period, frontEnd, backEnd, startDate, endDate, member } = body;
    const directory = "project";
    try {
        //접근권한 설정
        if(roleId !== 3){
            throw new Error(status.ACCESS_DENIED.message);
        }

        // 필수 내용 누락 여부 체크
        if (!title || !content || !period) {
            throw new Error(status.PARAMETER_IS_EMPTY.message);
        }

        const user = await Promise.all(member.map(async (id) => {
            if(period > 5){
                return authProvider.checkUserExistByUserId(id)
            } else {
                return await Member.findOne({
                    where: {
                        id: id,
                    },
                });
            }
        }));
        
        //공지 생성
        const newProject = await projectDao.addProject({
            roleId, 
            title, 
            subTitle, 
            content, 
            github, 
            period, 
            frontEnd, 
            backEnd, 
            startDate, 
            endDate
        });
        
        const contentId = newProject.id;
        
        if(path !== undefined){
            path.forEach(filePath => {
                projectDao.addProjectImage({
                    directory,
                    contentId,
                    location: filePath,
                });
            });
        }

        return response(status.SUCCESS_CREATE_NOTICE, newProject);
    } catch (error) {
        throw error;
    }
};

exports.modifyProject = async (projectId, body, path) => {
    const { roleId, title, subTitle, content, github, period, frontEnd, backEnd, startDate, endDate } = body;
    try {
        // 접근 권한 설정
        if (roleId !== 3) {
            throw new Error(status.ACCESS_DENIED.message);
        }

        // 필수 내용 누락 여부 체크
        if (!title || !content) {
            throw new Error(status.PARAMETER_IS_EMPTY.message);
        }

        const updatedProject = await projectDao.updateProject(projectId, {
            roleId, 
            title, 
            subTitle, 
            content, 
            github, 
            period, 
            frontEnd, 
            backEnd, 
            startDate, 
            endDate
        });

        // 이미지가 존재하는 경우에만 이미지 업데이트 수행
        let updatedImages = [];
        if (path.length > 0) {
            updatedImages = await projectDao.updateProjectImages(projectId, path);
        }

        // 업데이트된 이미지 정보를 updatedNotice에 추가
        updatedProject.dataValues.img = updatedImages.map(image => image.location);

        return updatedProject;
    } catch (error) {
        throw error;
    }
};


exports.deleteProject = async (projectId, query) => {
    const { roleId } = query;
    try {
        console.log("roleId", roleId);
        //접근권한 설정
        if(parseInt(roleId) !== 3){
            throw new Error(status.ACCESS_DENIED.message);
        }

        // 삭제된 공지사항 정보를 가져오고 이미지를 삭제
        const deletedProject = await projectDao.deleteProject(projectId);

        return deletedProject;
    } catch (error) {
        throw error;
    }
};