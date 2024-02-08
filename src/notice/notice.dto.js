const Notice = require('../../models/notice.js');
const Image = require('../../models/image.js');

exports.previewNoticeResponseDTO = async (noticeId, size) => {
    if (noticeId == "undefined" || typeof noticeId == "undefined" || noticeId == null) {
        noticeId = 0;
    }

    const EX_NOTICE = await Notice.findAll({
        order: [['id', 'DESC']],
        limit: parseInt(size),      // 불러올 개수
        offset: parseInt(noticeId),  // 건너뛸 개수
        raw: true // Sequelize의 데이터 값만 반환하도록 raw 옵션 추가
    });

    const EX_NOTICE_IMG = await Promise.all(EX_NOTICE.map(async (notice) => {
        const images = await Image.findAll({
            attributes: ['location'],
            where: {
                directory: "notice",
                contentId: notice.id
            },
        });

        // 이미지 데이터만을 가져와서 img 속성에 추가
        notice.img = images.map(img => img.dataValues);
        return notice;
    }));

    // 공지사항 미존재
    if (EX_NOTICE_IMG === null) return false;
    else return EX_NOTICE_IMG;
};
