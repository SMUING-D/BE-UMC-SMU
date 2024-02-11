const express = require('./config/express');
const db = require('./models/index.js');
require('./seeders/major.seed');
require('./seeders/role.seed');
// const { response, errResponse } = require('./config/response.js');
// const projectRouter = require('./src/project/project.route.js');
// const noticeRouter = require('./src/notice/notice.route.js');
// const userRouter = require('./src/users/userRoute.js');
// const authRouter = require('./src/auth/authRoute.js');
// const BaseError = require('./config/error.js');
// const status = require('./config/response.status.js');
// const { specs } = require('./config/swagger.config.js');
// const SwaggerUi = require('swagger-ui-express');
// const cors = require('cors');
const { insertMajorList } = require('./seeders/major.seed');
const { insertRoleList } = require('./seeders/role.seed');

require('dotenv').config();

db.sequelize
    .sync()
    .then(async () => {
        console.log('db 연결 성공');
        await insertMajorList(db.Major);
        await insertRoleList(db.Role);
    })
    .catch(console.error);

const port = 3000;
express().listen(port);
console.log(`${process.env.node_env} - API Server Start At Port ${port}`);
