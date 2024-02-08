const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const imageUploader = require('../../middlewares/image.uploader.js')
const projectController = require('./project.controller.js');

//공지사항 불러오기
router.get('/show/:period', asyncHandler(projectController.projectShow));

//공지사항 작성
router.post('/create', imageUploader.imageUploader.array('images', 10), asyncHandler(projectController.projectCreate));

// 공지사항 수정
router.put('/update/:id', imageUploader.imageUploader.array('images', 10), asyncHandler(projectController.projectEdit));

// 공지사항 및 이미지 삭제
router.delete('/delete/:id', asyncHandler(projectController.projectDelete));

module.exports = router;