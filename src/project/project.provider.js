const projectDto = require('./project.dto.js');

exports.getProject = async (query, period) => {
    const size = query.size;
    const projectId = query.projectId;
    return projectDto.previewProjectResponseDTO(period, projectId, size);
};

exports.getMember = async (period) => {
    return projectDto.previewProjectMemberResponseDTO(period);
};

//memberId로 조회하기
exports.checkUserExistByMemberId = async (memberId) => {
    return projectDto.previewMemberResponseDTO(memberId);
};