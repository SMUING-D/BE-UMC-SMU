const ejs = require('ejs');

//보낼 이메일 내용 렌더링
exports.renderAuthEmail = async (authUrl) => {
    try {
        let emailTemplate;
        await ejs.renderFile('./views/authEmailFormat.ejs', { auth_url: authUrl }, function (err, data) {
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
// const ejs = require('ejs');

// // Render email template with authentication URL
// exports.renderAuthEmail = async (authUrl) => {
//     try {
//         const emailTemplate = await ejs.renderFile('./views/authEmailFormat.ejs', { auth_url: authUrl });
//         return emailTemplate;
//     } catch (error) {
//         console.error('ejs.renderFile Error: ', error);
//         throw new Error('Error rendering email template');
//     }
// };
