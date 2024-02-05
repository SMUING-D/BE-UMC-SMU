const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const imageUploader = require('../../middlewares/image.uploader.js')

const noticeController = require('./notice.controller.js');

//공지사항 불러오기
router.get('/show', asyncHandler(noticeController.noticeShow));

//공지사항 작성
router.post('/create', imageUploader.imageUploader.array('images', 10), asyncHandler(noticeController.noticeCreate));

module.exports = router;