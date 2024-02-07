require('dotenv').config();
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { createUUID } = require('./uuid.js');
const path = require('path');

const { BaseError } = require('../config/error');
const { status } = require('../config/response.status');

const s3 = new AWS.S3({
    region: process.env.aws_s3_reagion,
    accessKeyId: process.env.aws_access_key,
    secretAccessKey: process.env.aws_secret_access_key
});

// 확장자 검사 목록
const allowedExtensions = ['.png', '.jpg', '.jpeg', '.bmp', '.gif'];

exports.imageUploader = multer({
    storage: multerS3({
        s3: s3, // S3 객체
        bucket: process.env.aws_s3_bucket_name, // Bucket 이름
        contentType: multerS3.AUTO_CONTENT_TYPE, // Content-type, 자동으로 찾도록 설정
        key: (req, file, callback) => {
            // 파일명
            const uploadDirectory = req.query.directory ?? ''; // 디렉토리 path 설정을 위해서
            const extension = path.extname(file.originalname); // 파일 이름 얻어오기
            const uuid = createUUID(); // UUID 생성
            // extension 확인을 위한 코드 (확장자 검사용)
            if (!allowedExtensions.includes(extension)) {
                return callback(new BaseError(status.WRONG_EXTENSION));
            }
            callback(null, `${uploadDirectory}/${uuid}_${file.originalname}`);
        },
        acl: 'public-read-write' // 파일 액세스 권한
    }),
    // 이미지 용량 제한 (5MB)
    limits: { fileSize: 10 * 1024 * 1024 },
});