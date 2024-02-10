// const express = require('express');
// const router = express.Router();

module.exports = function (app) {
    const asyncHandler = require('express-async-handler');
    const imageUploader = require('../../middlewares/image.uploader.js');
    const projectController = require('./project.controller.js');

    //프로젝트 불러오기
    app.get('/project/show/:period', asyncHandler(projectController.projectShow));

    //프로젝트 작성
    app.post('/project/create', imageUploader.imageUploader.array('images', 10), asyncHandler(projectController.projectCreate));

    // 프로젝트 수정
    app.put('/project/update/:id', imageUploader.imageUploader.array('images', 10), asyncHandler(projectController.projectEdit));

    // 프로젝트 및 이미지 삭제
    app.delete('/project/delete/:id', asyncHandler(projectController.projectDelete));
};