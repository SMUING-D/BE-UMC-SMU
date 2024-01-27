// const Crypto = require('crypto-js');

// exports.encrypt = (data, key) => {
//     return Crypto.AES.encrypt(data, key).toString();
// };

// exports.decrypt = (data, key) => {
//     return Crypto.AES.decrypt(data, key).toString(Crypto.enc.Utf8);
// };
const Crypto = require('crypto-js');

exports.encrypt = (data, key) => {
    try {
        const encrypted = Crypto.AES.encrypt(data, key);
        return encrypted.toString();
    } catch (error) {
        console.error('Encryption error:', error.message);
        return null;
    }
};
