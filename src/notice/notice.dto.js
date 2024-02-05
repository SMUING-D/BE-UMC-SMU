const Notice = require('../../models/notice.js');

exports.previewNoticeResponseDTO = async (noticeId, size) => {
    if(noticeId == "undefined" || typeof noticeId == "undefined" || noticeId == null){
        noticeId = 1;
    }
    const EX_NOTICE = await Notice.findAll({
        order: [['id', 'DESC']],
        limit: parseInt(size),
        offset: parseInt(noticeId)
    });
    
    //공자사항 미존재
    if (EX_NOTICE === null) return false;
    else return EX_NOTICE;
};