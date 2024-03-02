const status = require('../../config/response.status.js');
const projectDao =  require('./project.dao.js');
const authProvider = require('../auth/authProvider.js');
const projectProvider = require('../project/project.provider.js');

exports.createProject = async (roleId, body, path) => {
    const { title, subTitle, content, github, period, frontEnd, backEnd, startDate, endDate, member } = body;
    const directory = "project";
    try {
        //접근권한 설정
        if(roleId !== 3){
            throw new Error(status.ACCESS_DENIED.message);
        }

        // 필수 내용 누락 여부 체크
        if (!title || !content || !period || !member) {
            throw new Error(status.PARAMETER_IS_EMPTY.message);
        }

        //5기 초과면 현재 user 테이블에서 유저 불러오고 5기 이하면 이전 member 테이블에서 멤버 불러오기
        // const user = await Promise.all(member.map(async (id) => {
        //     if(period > 5){
        //         return authProvider.checkUserExistByUserId(id)
        //     } else {
        //         return projectProvider.checkUserExistByMemberId(id);
        //     }
        // }));
        
        //프로젝트 생성
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

        member.forEach(id => {
            projectDao.addProjectUser({
                userId: id,
                projectId: contentId
            });
        });

        return newProject;
    } catch (error) {
        throw error;
    }
};

exports.modifyProject = async (roleId, projectId, body, path) => {
    const {title, subTitle, content, github, period, frontEnd, backEnd, startDate, endDate, member } = body;
    try {
        // 접근 권한 설정
        if (roleId !== 3) {
            throw new Error(status.ACCESS_DENIED.message);
        }

        // 필수 내용 누락 여부 체크
        // if (!title || !content) {
        //     throw new Error(status.PARAMETER_IS_EMPTY.message);
        // }

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

        // 업데이트된 이미지 정보를 updatedProject에 추가
        updatedProject.dataValues.img = updatedImages.map(image => image.location);
        
        // 사용자가 존재하는 경우 사용자 업데이트 수행
        let updatedUsers = [];
        if (member.length > 0) {
            updatedUsers = await projectDao.updateProjectUsers(period, projectId, member);
        }

        // 업데이트된 유저 정보를 updatedProject에 추가
        updatedProject.dataValues.user = updatedUsers.map(user => user);

        return updatedProject;
    } catch (error) {
        throw error;
    }
};


exports.deleteProject = async (roleId, projectId) => {
    try {
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