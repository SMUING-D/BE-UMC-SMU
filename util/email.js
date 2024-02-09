const nodemailer = require('nodemailer');

const ADMIN_EMAIL_SETTING = {
    service: 'naver',
    host: 'smtp.naver.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.email,
        pass: process.env.email_pw,
    },
    tls: {
        rejectUnauthorized: false,
    },
};

//이메일 보내기
exports.sendVerificationEmail = (studentId, subject, html) => {
    const toEmail = studentId + '@sangmyung.kr';
    console.log('받는이메일주소:', toEmail);
    console.log('보내는이메일주소:', process.env.email);
    try {
        const transporter = nodemailer.createTransport(ADMIN_EMAIL_SETTING);
        const mailOptions = {
            from: process.env.email,
            to: toEmail,
            subject: subject,
            html: html,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Send Email Callback Error: ' + error.message);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    } catch (error) {
        console.error('Send Email Error: ' + error.message);
    }
};
