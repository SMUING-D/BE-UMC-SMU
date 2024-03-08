const { verifyAToken } = require('../../middlewares/index.js');

module.exports = function (app) {
    const asyncHandler = require('express-async-handler');
    const imageUploader = require('../../middlewares/image.uploader.js');
    const noticeController = require('./notice.controller.js');

    //공지사항 불러오기
    app.get('/notice/show', asyncHandler(noticeController.noticeShow));

    //아이디로 공지사항 불러오기
    app.get('/notice/show/:id', asyncHandler(noticeController.noticeShowId));

    //공지사항 작성
    app.post('/notice/create', verifyAToken, imageUploader.imageUploader.array('images', 10), asyncHandler(noticeController.noticeCreate));

    // 공지사항 수정
    app.put('/notice/update/:id', verifyAToken, imageUploader.imageUploader.array('images', 10), asyncHandler(noticeController.noticeEdit));

    // 공지사항 및 이미지 삭제
    app.delete('/notice/delete/:id', verifyAToken, asyncHandler(noticeController.noticeDelete));
};