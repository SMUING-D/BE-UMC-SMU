export const getProjectByProjectIdAtFirst = 
"SELECT p.projectId, p.title, p.content, p.startDate, p.endDate, p.frontEnd, p.backEnd "
+ "FROM project p JOIN members m on p.projectId = m.projectId "
+ "WHERE p.projectId < ? "
+ "ORDER BY p.projectId DESC LIMIT ? ;"

export const getProjectByProjectId = 
"SELECT p.projectId, p.title, p.content, p.startDate, p.endDate, p.frontEnd, p.backEnd "
+ "FROM project p JOIN members m on p.projectId = m.projectId "
+ "ORDER BY p.projectId DESC LIMIT ? ;"

export const insertProjecteSql = 
"INSERT INTO project (userId, title, content, startDate, endDate, frontEnd, backEnd) VALUES (?, ?, ?, ?);";