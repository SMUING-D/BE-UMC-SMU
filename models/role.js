// models/Role.js

const Sequelize = require('sequelize');

module.exports = class Role extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },
                roleName: {
                    type: Sequelize.STRING(30),
                    allowNull: true,
                },
                createdAt: {
                    type: Sequelize.DATE,
                    allowNull: true,
                },
                deletedAt: {
                    type: Sequelize.DATE,
                    allowNull: true,
                },
                updatedAt: {
                    type: Sequelize.DATE,
                    allowNull: true,
                },
            },
            {
                sequelize,
                modelName: 'Role',
                tableName: 'role',
                timestamps: true,
                paranoid: true,
            }
        );
    }
    static associate(db) {
        // Role 모델과 UmcUser 모델 간의 일대다 관계 설정
        Role.hasMany(UmcUser, { foreignKey: 'roleId' });
    }
};
