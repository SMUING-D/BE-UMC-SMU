// const express = require('express');
// require('dotenv').config();
// const db = require('./models');
// const { authRoute } = require('./src/auth/authRoute');
// const cors = require('cors');

// db.sequelize
//     .sync()
//     .then(() => {
//         console.log('db 연결 성공');
//     })
//     .catch(console.error);

// const app = express();

// // server setting - veiw, static, body-parser etc..
// app.set('port', process.env.server_port || 3000); // 서버 포트 지정
// app.use(cors()); // cors 방식 허용
// app.use(express.static('public')); // 정적 파일 접근
// app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함
// app.use(express.urlencoded({ extended: true })); // 단순 객체 문자열 형태로 본문 데이터 해석

// // router setting
// app.use('/auth', authRoute);
// // // 루트 엔드포인트
// // app.get('/', (req, res) => {
// //     res.send('Express 애플리케이션에 오신 것을 환영합니다!');
// // });

// app.listen(app.get('port'), () => {
//     console.log(app.get('port'), '번 포트에서 대기 중');
// });
const db = require('./models');
require('./seeders/major.seed');
require('./seeders/role.seed');
const express = require('./config/express');

require('dotenv').config();
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

const port = 3000;
express().listen(port);
console.log(`${process.env.node_env} - API Server Start At Port ${port}`);
