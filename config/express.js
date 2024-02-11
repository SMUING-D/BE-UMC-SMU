// const express = require('express');
// const cors = require('cors');

// const app = express();

// // Server settings - view, static, body-parser, etc.
// app.use(cors()); // CORS 방식 허용
// app.use(express.static('public')); // 정적 파일 접근
// app.use(express.json()); // Request의 본문을 JSON으로 해석할 수 있도록 함
// app.use(express.urlencoded({ extended: true })); // 단순 객체 문자열 형태로 본문 데이터 해석

// // module.exports = app;
const bodyParser = require('body-parser');
const express = require('express');
const compression = require('compression');
const methodOverride = require('method-override');
const morgan = require('morgan');
var cors = require('cors');
require('dotenv').config();

module.exports = function () {
    const app = express();

    app.use(compression()); // 데이터 압축
    app.use(express.json()); // application/json타입으로 들어오는 데이터를 req.body로 파싱해주는 역할
    app.use(express.urlencoded({ extended: true })); // application/x-www-form-urlencoded타입으로 들어오는 데이터를 req.body로 파싱해주는 역할
    app.use(methodOverride()); // method-override
    app.use(morgan('dev')); // 로그 확인 (response 색상 입힌 개발용)
    app.use(express.static('public')); // 정적 파일 접근
    app.use(bodyParser.json()); // JSON 형식의 요청 본문 파싱을 위한 미들웨어 설정
    app.use(cors()); //자신이 속하지 않은 다른 도메인, 다른 프로토콜, 혹은 다른 포트에 있는 리소스를 요청하는 cross-origin HTTP 요청 방식

    require('../src/auth/authRoute')(app);
    require('../src/users/userRoute')(app);
    require('../src/notice/notice.route')(app);
    require('../src/project/project.route')(app);

    return app;
};
