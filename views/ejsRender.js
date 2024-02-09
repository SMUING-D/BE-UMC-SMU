const ejs = require('ejs');

//보낼 인증 이메일 내용 렌더링
exports.renderAuthEmail = async (authNum) => {
    try {
        let emailTemplate;
        await ejs.renderFile('./views/authEmailFormat.ejs', { auth_num: authNum }, function (err, data) {
            if (err) {
                throw new Error(err);
            }
            emailTemplate = data;
        });
        return emailTemplate;
    } catch (error) {
        console.error('ejs.renderFile Error: ', error);
    }
};

//임시 비밀번호 렌더링
exports.rendertemporaryPwEmail = async (temporaryPw) => {
    try {
        let emailTemplete;
        await ejs.renderFile('./views/tempPwEmailFormat.ejs', { temporaryPw: temporaryPw }, function (err, data) {
            if (err) {
                throw new Error(err);
            }
            emailTemplete = data;
        });
        return emailTemplete;
    } catch (error) {
        console.error('ejs.renderFile Error: ', error);
    }
};
