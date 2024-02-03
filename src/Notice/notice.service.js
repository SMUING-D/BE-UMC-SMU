const { status } = require('../../config/response.status.js');
const noticeDao =  require('./notice.dao.js');

exports.createNotice = async (body) => {
    const { roleId, title, content } = body;

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
        
        return response(status.SUCCESS_CREATE_NOTICE, newNotice);
    } catch (error) {
        throw error;
    }
};
