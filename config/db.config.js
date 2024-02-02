const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

require("dotenv").config()

export const pool = mysql.createPool({
  connectionLimit: 100, // 최대 연결 수
  waitForConnections: true,
  // Pool에 획득할 수 있는 connection이 없을 때,
	// true면 요청을 queue에 넣고 connection을 사용할 수 있게 되면 요청을 실행하며, false이면 즉시 오류를 내보내고 다시 요청
  queueLimit: 0,
  host: process.env.host || 'localhost',
  user: process.env.user || 'root',
  port: process.env.port || 3306,
  database: process.env.database || 'umcdb',
  password: process.env.password || 'root1234',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const getConnection = () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        resolve(connection);
      }
    });
  });
};