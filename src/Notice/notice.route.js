const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const imageUploader = require('../Middleware/image.uploader.js')

const noticeController = require('./notice.controller.js');

//공지사항 불러오기
router.get('/show', /*imageUploader.imageUploader.array('image', 10),*/ asyncHandler(noticeController.noticeShow));

//공지사항 작성
router.post('/create', asyncHandler(noticeController.noticeCreate));

module.exports = router;