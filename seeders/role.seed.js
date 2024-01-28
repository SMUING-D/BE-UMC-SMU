const { Role } = require('../models/role');
const Sequelize = require('sequelize');
('use strict');

const Role_List = ['게스트', '부원', '운영진'];

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const Role = Role_List.map((roleName) => ({ roleName }));
        await queryInterface.bulkInsert('Role', Role, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Role', null, {});
    },
};

// exports.insertRoleList = async (Role_List) => {
//     try {
//         for (const roleName of Role_List) {
//             await Role.create({ roleName });
//         }
//         console.log('Role List inserted successfully.');
//     } catch (error) {
//         console.error('Error inserting Role List:', error);
//     }
// };
