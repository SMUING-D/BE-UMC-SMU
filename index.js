const express = require('express');
require('dotenv').config();
const db = require('./models');
const { response } = require('./config/response');
// const { userRouter } = require('./src/users/userRoute');
// const { authRouter } = require('./src/auth/authRoute');
const { BaseError } = require('./config/error');
const { status } = require('./config/response.status');
const cors = require('cors');

db.sequelize
    .sync()
    .then(() => {
        console.log('db 연결 성공');
    })
    .catch(console.error);

const app = express();

// server setting - veiw, static, body-parser etc..
app.set('port', process.env.server_port || 3000); // 서버 포트 지정
app.use(cors()); // cors 방식 허용
app.use(express.static('public')); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

// router setting
// app.use('/user', userRouter);
// app.use('/auth', authRouter);

// error handling
app.use((req, res, next) => {
    const err = new BaseError(status.NOT_FOUND);
    next(err);
});

app.use((err, req, res, next) => {
    console.log(err.data.status);
    console.log(err.data.message);
    // 템플릿 엔진 변수 설정
    res.locals.message = err.message;
    // 개발환경이면 에러를 출력하고 아니면 출력하지 않기
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.data.status).send(response(err.data));
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});
