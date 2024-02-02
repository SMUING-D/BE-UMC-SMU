const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const projectController = require('./project.controller.js');
router.get('/show', asyncHandler(projectController.projectShow));
router.post('/create', asyncHandler(projectController.projectCreate));

module.exports = router;