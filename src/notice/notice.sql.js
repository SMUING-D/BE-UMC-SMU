export const getNoticeByNoticeIdAtFirst = /*"SELECT * FROM `notice`;";*/
"SELECT u.userName, u.userId, n.noticeId, n.title, n.content, n.createdAt "
+ "FROM notice n JOIN user u on n.userId = u.id "
+ "WHERE n.noticeId < ? "
+ "ORDER BY n.noticeId DESC LIMIT ? ;";

export const getNoticeByNoticeId = /*"SELECT * FROM `notice`;";*/
"SELECT u.userName, u.userId, n.noticeId, n.title, n.content, n.createdAt "
+ "FROM notice n JOIN user u on n.userId = u.id "
+ "ORDER BY n.noticeId DESC LIMIT ? ;"

export const insertNoticeSql = 
"INSERT INTO notice (userId, title, content, createdAt) VALUES (?, ?, ?, ?);";