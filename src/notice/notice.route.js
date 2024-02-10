// const express = require('express');
// const router = express.Router();

module.exports = function (app) {
    const asyncHandler = require('express-async-handler');
    const imageUploader = require('../../middlewares/image.uploader.js');
    const noticeController = require('./notice.controller.js');

    //공지사항 불러오기
    app.get('/notice/show', asyncHandler(noticeController.noticeShow));

    //공지사항 작성
    app.post('/notice/create', imageUploader.imageUploader.array('images', 10), asyncHandler(noticeController.noticeCreate));

    // 공지사항 수정
    app.put('/notice/update/:id', imageUploader.imageUploader.array('images', 10), asyncHandler(noticeController.noticeEdit));

    // 공지사항 및 이미지 삭제
    app.delete('/notice/delete/:id', asyncHandler(noticeController.noticeDelete));
};