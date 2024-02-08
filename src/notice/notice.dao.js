const BaseError = require('../../config/error.js');
const status = require('../../config/response.status.js');
const Notice = require('../../models/notice.js');
const Image = require('../../models/image.js');

exports.addNotice = async (body) => {
    try{
        //공지 생성
        const newNotice = await Notice.create(body);

        return newNotice;
    }catch (err) {
        console.error('Error creating notice:', err);
        throw new BaseError(status.CREATION_FAILED);
    }
}

exports.addNoticeImage = async (body) => {
    try{
        const newNoticeImage = await Image.create(body);
        return newNoticeImage;
    }catch (err) {
        console.error('Error creating noticeImage:', err);
        throw new BaseError(status.CREATION_FAILED);
    }
}

exports.updateNotice = async (noticeId, body) => {
    try {
        //공지 수정
        const [updatedRows] = await Notice.update(body, {
            where: { id: noticeId },
            returning: true,
        });

        if (updatedRows === 0) {
            throw new BaseError(status.NOT_FOUND);
        }

        const updatedNotice = await Notice.findByPk(noticeId);

        return updatedNotice;
    } catch (error) {
        throw error;
    }
};

exports.updateNoticeImages = async (noticeId, paths) => {
    try {
        // 기존에 데이터베이스에 연결된 noticeId에 해당하는 이미지를 모두 삭제
        await Image.destroy({
            where: { contentId: noticeId, directory: 'notice' },
        });

        // 새로운 이미지를 추가
        const newImages = paths.map(filePath => ({
            contentId: noticeId,
            directory: 'notice',
            location: filePath,
        }));

        await Image.bulkCreate(newImages);

        const updatedNoticeImg = await Image.findAll({
            attributes: ['location'],
            where: {
                directory: "notice",
                contentId: noticeId
            },
        });

        return updatedNoticeImg;
    } catch (error) {
        throw error;
    }
};

exports.deleteNotice = async (noticeId) => {
    try {
        // 삭제된 공지사항 정보를 가져오고 공지사항을 삭제
        const deletedNotice = await Notice.findByPk(noticeId);
        await Notice.destroy({ where: { id: noticeId } });
        await Image.destroy({ where: { contentId: noticeId, directory: 'notice' } });

        return deletedNotice;
    } catch (error) {
        throw error;
    }
};