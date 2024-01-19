const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // sequelize 인스턴스를 가져오는 부분에 맞게 수정해야 합니다.

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
        major: {
            type: DataTypes.STRING(15),
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        nickname: {
            type: DataTypes.STRING(30),
            allowNull: true,
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

module.exports = UmcUser;
