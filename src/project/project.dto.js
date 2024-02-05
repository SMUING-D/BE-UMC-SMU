export const previewProjectResponseDTO = (data) => {

    const project = [];

    for (let i = 0; i < data.length; i++) {
        project.push({
            "title": data[i].title,
            "content": data[i].content,
            "startDate": formatDate(data[i].startDate),
            "endDate": formatDate(data[i].endDate),
            "frontEnd": formatDate(data[i].frontEnd),
            "backEnd": formatDate(data[i].backEnd)
        })
    }
    return {"projectData": project, "cursorId": data[data.length-1].review_id};
}

const formatDate = (date) => {
    return new Intl.DateTimeFormat('kr').format(new Date(date)).replaceAll(" ", "").slice(0, -1);
}