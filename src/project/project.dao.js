// const BaseError = require('../../config/error.js');
// const Project = require('../../models/project.js');
// const status = require('../../config/response.status.js');
// const pool = require('../../config/db.config.js');
// const getProjectByProjectIdAtFirst = require('./project.sql.js');

// export const getPreviewProject = async (cursorId, size) => {
//     try {
//         const conn = await pool.getConnection();

//         if(cursorId == "undefined" || typeof cursorId == "undefined" || cursorId == null){
//             const [project] = await pool.query(getProjectByProjectIdAtFirst, [parseInt(size)]);
//             conn.release();
//             return project;
//         }else{
//             const [project] = await pool.query(getProjectByProjectId, [parseInt(cursorId), parseInt(size)]);
//             conn.release();
//             return project;
//         }
//     } catch (err) {
//         throw new BaseError(status.PARAMETER_IS_WRONG);
//     }
// }

// export const addProject = async (roleId, title, content, frontEnd, backEnd) => {
//     try{
//         //프로젝트 생성
//         const newProject = await Project.create({
//             roleId,
//             title,
//             content,
//             frontEnd,
//             backEnd,
//         });

//         return newProject;

//     }catch (err) {
//         throw new BaseError(status.CREATION_FAILED);
//     }
// }