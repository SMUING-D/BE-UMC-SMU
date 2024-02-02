const previewProjectResponseDTO = require('./project.dto.js');
const getPreviewProject = require('./project.dao.js');

export const getProject = async (query) => {
    const {projectId, size = 10} = query;
    return previewProjectResponseDTO(await getPreviewProject(projectId, size));
};