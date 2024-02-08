const Project = require('../../models/notice.js');
const Image = require('../../models/image.js');

exports.previewProjectResponseDTO = async (period, projectId, size) => {
    if (projectId == "undefined" || typeof projectId == "undefined" || projectId == null) {
        projectId = 0;
    }

    //period가 0이 아니면 해당 기수 불러오기, 0이면 전체 불러오기
    const EX_PROJECT = 
    period !== 0 ? await Project.findAll({
        where: {
            period: period
        },
        order: [['id', 'DESC']],
        limit: parseInt(size),      // 불러올 개수
        offset: parseInt(projectId),  // 건너뛸 개수
        raw: true // Sequelize의 데이터 값만 반환하도록 raw 옵션 추가
    })
    : await Project.findAll({
        order: [['id', 'DESC']],
        limit: parseInt(size),      // 불러올 개수
        offset: parseInt(projectId),  // 건너뛸 개수
        raw: true // Sequelize의 데이터 값만 반환하도록 raw 옵션 추가
    });

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

    // 공지사항 미존재
    if (EX_PROJECT_IMG === null) return false;
    else return EX_PROJECT_IMG;
};
