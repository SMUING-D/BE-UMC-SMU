const { verifyAToken } = require('../../middlewares/index.js');
const asyncHandler = require('express-async-handler');

module.exports = function (app) {
    const imageUploader = require('../../middlewares/image.uploader.js');
    const projectController = require('./project.controller.js');

    //프로젝트 불러오기
    app.get('/project/show/:period', asyncHandler(projectController.projectShow));

    //프로젝트 작성
    app.post('/project/create', verifyAToken, imageUploader.imageUploader.array('images', 10), asyncHandler(projectController.projectCreate));

    // 프로젝트 수정
    app.put('/project/update/:id', verifyAToken, imageUploader.imageUploader.array('images', 10), asyncHandler(projectController.projectEdit));

    // 프로젝트 및 이미지 삭제
    app.delete('/project/delete/:id', verifyAToken, asyncHandler(projectController.projectDelete));
};