const { Role } = require('../models/role');

const Role_List = ['게스트', '부원', '운영진'];

exports.insertRoleList = async (Role) => {
    try {
        for (const roleName of Role_List) {
            await Role.create({ roleName });
        }
        console.log('Role List inserted successfully.');
    } catch (error) {
        console.error('Error inserting Role List:', error);
    }
};
