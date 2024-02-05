const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const multer = require('multer');
const S3Storage = require('multer-s3-transform');
const createUUID = require('./uuid.js');
const path = require('path');

const BaseError = require('../config/error');
const status = require('../config/response.status');

const s3Client = new S3Client({
    region: process.env.aws_s3_reagion,
    credentials: {
        accessKeyId: process.env.aws_access_key,
        secretAccessKey: process.env.aws_secret_access_key
    },
});

const allowedExtensions = ['.png', '.jpg', '.jpeg', '.bmp', '.gif'];

exports.imageUploader = multer({
    storage: new S3Storage({
        client: s3Client,
        bucket: process.env.aws_s3_bucket_name,
        contentType: S3Storage.AUTO_CONTENT_TYPE,
        s3: s3Client,  // 이 줄을 추가하여 's3' 옵션을 제공합니다.
        key: async (req, file, callback) => {
            const uploadDirectory = req.query.directory ?? '';
            const extension = path.extname(file.originalname);
            const uuid = createUUID();

            if (!allowedExtensions.includes(extension)) {
                return callback(new BaseError(status.WRONG_EXTENSION));
            }

            const key = `${uploadDirectory}/${uuid}_${file.originalname}`;

            try {
                await s3Client.send(new PutObjectCommand({
                    Bucket: process.env.aws_s3_bucket_name,
                    Key: key,
                    ACL: 'public-read-write',
                    Body: file.buffer,
                }));
                callback(null, key);
            } catch (error) {
                callback(error);
            }
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});
