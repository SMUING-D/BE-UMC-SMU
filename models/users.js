const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const UmcUser = sequelize.define(
    'UmcUser',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        studentId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        name: {
            type: DataTypes.STRING(15),
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        majorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        nickname: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        profileImgUrl: {
            type: DataTypes.STRING(2084),
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.TIMESTAMP,
            allowNull: true,
        },
        updatedAt: {
            type: DataTypes.TIMESTAMP,
            allowNull: true,
        },
        deletedAt: {
            type: DataTypes.TIMESTAMP,
            allowNull: true,
        },
    },
    {
        tableName: 'umcUser',
        timestamps: true,
        paranoid: true,
    }
);

// User 모델과 Major 모델 간의 관계 설정
User.belongsTo(Major, { foreignKey: 'majorId' });
// User 모델과 Role 모델 간의 관계 설정
User.belongsTo(Role, { foreignKey: 'roleId' });

// 사용자 생성 시 기본 역할 설정
User.addHook('beforeCreate', async (user) => {
    const defaultRole = await Role.findOne({ where: { roleName: '게스트' } });
    user.roleId = defaultRole.id;
});

module.exports = UmcUser;
