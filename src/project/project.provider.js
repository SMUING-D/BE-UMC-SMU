const projectDto = require('./project.dto.js');

exports.getProject = async (query, period) => {
    const size = query.size;
    const projectId = query.projectId;
    return projectDto.previewProjectResponseDTO(period, projectId, size);
};