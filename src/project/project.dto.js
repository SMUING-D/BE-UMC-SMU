const { Op } = require('sequelize');
const Project = require('../../models/project.js');
const Image = require('../../models/image.js');
const ProjectUser = require('../../models/projectUser.js');
const User = require('../../models/umcUser.js');
const Member = require('../../models/umcMember.js');

exports.previewProjectResponseDTO = async (period, projectId, size) => {
    if (projectId == "undefined" || typeof projectId == "undefined" || projectId == null) {
        projectId = 0;
    }
    
    //period가 0이면 min을 1, max를 현재 최대 기수값으로 설정,
    //period가 0이 아니면 min, max를 period 값으로 설정
    let minPeriod = 1;
    let maxPeriod = period;

    if(period != 0){
        minPeriod = period;
    } else {
        await Project.max('period').then(max => {
            maxPeriod = max
        });
    }

    //period가 0이 아니면 해당 기수 불러오기, 0이면 전체 불러오기
    const EX_PROJECT = await Project.findAll({
        where: {
            period: {
                [Op.and]: [{[Op.gte]: minPeriod}, {[Op.lte]: maxPeriod}],  //min 이상 max 이하 기수 불러오기
            }
        },
        order: [['id', 'DESC']],
        limit: parseInt(size),      // 불러올 개수
        offset: parseInt(projectId),  // 건너뛸 개수
        raw: true // Sequelize의 데이터 값만 반환하도록 raw 옵션 추가
    });

    //프로젝트마다 이미지 가져오기
    const EX_PROJECT_IMG = await Promise.all(EX_PROJECT.map(async (project) => {
        const images = await Image.findAll({
            attributes: ['location'],
            where: {
                directory: "project",
                contentId: project.id
            },
        });

        // 이미지 데이터만을 가져와서 img 속성에 추가
        project.img = images.map(img => img.dataValues);
        return project;
    }));

    //프로젝트마다 참여 멤버 가져오기
    const EX_PROJECT_MEMBER = await Promise.all(EX_PROJECT_IMG.map(async (project) => {
        //projectUser에 등록되어있는 user id를 project id 값으로 가쟈오기
        const member = await ProjectUser.findAll({
            where: {
                projectId: project.id
            }
        });

        //실제 멤버 데이터 불러오기
        const users = await Promise.all(member.map(async (project_user) => {
            //기수가 5기 이하면 예전 멤버 데이터에서 가져오고 6기부터는 현재 유저 데이터에서 가져오기
            const user = 
            project.period < 6 ? await Member.findAll({
                where: {
                    id: project_user.dataValues.userId
                }
            })
            : await User.findAll({
                where: {
                    id: project_user.dataValues.userId
                }
            });
            return user;
        }));

        // 프로젝트에 user 속성을 만들어서 불러온 users 추가
        project.user = users.map(user => {
            const userObject = user.map(userObj => {
                return userObj.dataValues;
            });
            return userObject;
        });
        return project;
    }));

    // 공지사항 미존재
    if (EX_PROJECT_MEMBER === null) return false;
    else return EX_PROJECT_MEMBER;
};

exports.previewProjectMemberResponseDTO = async (period) => {
    console.log("period", period);
    const EX_USER = 
    period < 6 ? await Member.findAll({
        where: {
            year: period
        }
    })
    : await User.findAll({
    });

    if (EX_USER === null) return false;
    return EX_USER;
};


exports.previewMemberResponseDTO = async (memberId) => {
    const EX_USER = await Member.findOne({
        where: {
            id: memberId,
        },
    });
    //사용자 미존재
    if (EX_USER === null) return false;
    else return EX_USER;
};