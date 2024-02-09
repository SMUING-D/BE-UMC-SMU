const noticeDto = require('./notice.dto.js');

exports.getNotice = async (query) => {
    const size = query.size;
    const noticeId = query.noticeId;
    return noticeDto.previewNoticeResponseDTO(noticeId, size);
};