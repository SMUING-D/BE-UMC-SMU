const Major = require('../../models/major');
const umcUser = require('../../models/umcUser');
const { response, errResponse } = require('../../config/response');
const baseResponse = require('../../config/response.status');

//학번 중복 확인
exports.checkStudentIdExist = async (studentId) => {
    const EX_USER = await umcUser.findOne({ where: { studentId: studentId } });

    if (EX_USER) return EX_USER;
    else return null;
};

//major 찾는 함수
exports.findMajorByName = async (majorName) => {
    try {
        const major = await Major.findOne({ where: { majorName } });
        return major;
    } catch (error) {
        console.error('Error finding major by name:', error);
        throw error;
    }
};

exports.findUserByOptions = async (studentId, verificationCode) => {
    try {
        const user = await umcUser.findOne({ where: { studentId, verificationCode } });
        return user;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

//umcUser테이블에 사용자 추가
exports.createUser = async (userData) => {
    try {
        const newUser = await umcUser.create(userData);
        return newUser;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

//AUTH_CODE 업데이트
exports.saveVerificationCode = async (studentId, verificationCode) => {
    try {
        const user = await umcUser.findOne({
            where: { studentId },
        });
        if (!user) {
            throw new Error(errResponse(baseResponse.MEMBER_NOT_FOUND));
        }
        const updateUser = await umcUser.update(
            { verificationCode }, // Properties to be updated
            { where: { studentId } } // Where clause to identify the record
        );

        return updateUser ? true : false;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

//인증 상태 업데이트

exports.updateVerificationStatus = async (studentId) => {
    try {
        const updateStatus = await umcUser.update(
            { isVerified: true },
            {
                where: { studentId },
            }
        );
        if (updateStatus[0] > 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};
