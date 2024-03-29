const Major = require('../../models/major');
const User = require('../../models/umcUser');
const { response, errResponse } = require('../../config/response');
const baseResponse = require('../../config/response.status');

//학번 중복 확인
exports.checkStudentIdExist = async (studentId) => {
    const EX_USER = await User.findOne({ where: { studentId: studentId } });

    return EX_USER;
};
//userId로 조회하기
exports.checkUserExistByUserId = async (userId) => {
    const EX_USER = await User.findOne({
        where: {
            id: userId,
        },
    });
    //사용자 미존재
    if (EX_USER === null) return false;
    else return EX_USER;
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
//여러 옵션들로 사용자 조회
exports.findUserByOptions = async (studentId, verificationCode) => {
    try {
        const user = await User.findOne({ where: { studentId, verificationCode } });
        return user;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

//User테이블에 사용자 추가
exports.createUser = async (userData) => {
    try {
        const newUser = await User.create(userData);
        return newUser;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

//AUTH_CODE 업데이트
exports.saveVerificationCode = async (studentId, verificationCode) => {
    try {
        const user = await User.findOne({
            where: { studentId },
        });
        if (!user) {
            throw new Error(errResponse(baseResponse.MEMBER_NOT_FOUND));
        }
        const updateUser = await User.update(
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
        const updateStatus = await User.update(
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

//비밀번호 찾기
exports.updatePassword = async (NEW_PW_HASH, studentId) => {
    try {
        const updatePassword = await User.update({ password: NEW_PW_HASH }, { where: { studentId: studentId } });
        return updatePassword ? true : false;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

//비밀번호 변경하기
