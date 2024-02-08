require('./seeders/major.seed');
require('./seeders/role.seed');
const express = require('express');
require('dotenv').config();
const db = require('./models/index.js');
const { response, errResponse } = require('./config/response.js');
const projectRouter = require('./src/project/project.route.js');
const noticeRouter = require('./src/notice/notice.route.js');
const userRouter = require('./src/users/userRoute.js');
const authRouter = require('./src/auth/authRoute.js');
const BaseError = require('./config/error.js');
const status = require('./config/response.status.js');
const {specs} = require('./config/swagger.config.js');
const SwaggerUi = require('swagger-ui-express');
const cors = require('cors');
// const { insertMajorList } = require('./seeders/major.seed');
// const { insertRoleList } = require('./seeders/role.seed');

db.sequelize
    .sync()
    .then(async () => {
        console.log('db 연결 성공');
        // await insertMajorList(db.Major);
        // await insertRoleList(db.Role);
    })
    .catch(console.error);

const app = express();

// server setting - veiw, static, body-parser etc..
app.set('port', process.env.server_port || 3000);    // 서버 포트 지정
app.use(cors());                                    // cors 방식 허용
app.use(express.static('public'));                  // 정적 파일 접근
app.use(express.json());                            // request의 본문을 json으로 해석할 수 있도록 함
app.use(express.urlencoded({extended: false}));     // 단순 객체 문자열 형태로 본문 데이터 해석
    
// swagger
app.use('/api-docs', SwaggerUi.serve, SwaggerUi.setup(specs));
    
// router setting
app.use('/project', projectRouter);
app.use('/notice', noticeRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);
    
// error handling
app.use((req, res, next) => {
    const err = new BaseError(status.NOT_FOUND);
    next(err);
});
    
app.use((err, req, res, next) => {
    console.error(err);
    
    console.log(err.data ? err.data.status : 'Unknown status'); // 수정
    console.log(err.data ? err.data.message : 'Unknown message'); // 수정
    // 템플릿 엔진 변수 설정
    res.locals.message = err.message;
    // 개발환경이면 에러를 출력하고 아니면 출력하지 않기
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.data ? err.data.status : status.INTERNAL_SERVER_ERROR).send(response(err.data));
});
    
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});