const BaseError = require('../../config/error.js');
const Notice = require('../../models/notice.js');
const status = require('../../config/response.status.js');

exports.addNotice = async (body) => {
    try{
        //공지 생성
        const newNotice = await Notice.create(body);
        return newNotice;
    }catch (err) {
        console.error('Error creating notice:', err);
        throw new BaseError(status.CREATION_FAILED);
    }
}