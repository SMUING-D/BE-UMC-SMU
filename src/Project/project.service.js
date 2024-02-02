const { status } = require('../../config/response.status.js');
const projectDao =  require('./project.dao.js');

async function createProject(body) {
    const { roleId, title, content } = body;

    try {
        //접근권한 설정
        if(!roleId){
            throw new Error(status.ACCESS_DENIED.message);
        }

        // 필수 내용 누락 여부 체크
        if (!title || !content) {
            throw new Error(status.PARAMETER_IS_EMPTY.message);
        }
        
        //공지 생성
        const newProject = await projectDao.addProject({
            roleId,
            title,
            content,
            frontEnd,
            backEnd,
        });

        return newProject;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createProject,
};