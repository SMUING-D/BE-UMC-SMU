const status = require('../../config/response.status.js');
const noticeDao =  require('./notice.dao.js');

exports.createNotice = async (body, path) => {
    const { roleId, title, content } = body;
    const directory = "notice";
    try {
        //접근권한 설정
        if(roleId !== 3){
            throw new Error(status.ACCESS_DENIED.message);
        }

        // 필수 내용 누락 여부 체크
        if (!title || !content) {
            throw new Error(status.PARAMETER_IS_EMPTY.message);
        }
        
        //공지 생성
        const newNotice = await noticeDao.addNotice({
            roleId,
            title,
            content,
        });
        
        const contentId = newNotice.id;
        
        if(path !== undefined){
            path.forEach(filePath => {
                noticeDao.addNoticeImage({
                    directory,
                    contentId,
                    location: filePath,
                });
            });
        }

        return response(status.SUCCESS_CREATE_NOTICE, newNotice);
    } catch (error) {
        throw error;
    }
};

exports.modifyNotice = async (noticeId, body, path) => {
    const { roleId, title, content } = body;
    try {
        // 접근 권한 설정
        if (roleId !== 3) {
            throw new Error(status.ACCESS_DENIED.message);
        }

        // 필수 내용 누락 여부 체크
        if (!title || !content) {
            throw new Error(status.PARAMETER_IS_EMPTY.message);
        }

        const updatedNotice = await noticeDao.updateNotice(noticeId, body);

        // 이미지가 존재하는 경우에만 이미지 업데이트 수행
        let updatedImages = [];
        if (path.length > 0) {
            updatedImages = await noticeDao.updateNoticeImages(noticeId, path);
        }

        // 업데이트된 이미지 정보를 updatedNotice에 추가
        updatedNotice.dataValues.img = updatedImages.map(image => image.location);

        console.log("updatedNotice", updatedNotice);
        return updatedNotice;
    } catch (error) {
        throw error;
    }
};


exports.deleteNotice = async (noticeId, query) => {
    const { roleId } = query;
    try {
        console.log("roleId", roleId);
        //접근권한 설정
        if(parseInt(roleId) !== 3){
            throw new Error(status.ACCESS_DENIED.message);
        }

        // 삭제된 공지사항 정보를 가져오고 이미지를 삭제
        const deletedNotice = await noticeDao.deleteNotice(noticeId);

        return deletedNotice;
    } catch (error) {
        throw error;
    }
};