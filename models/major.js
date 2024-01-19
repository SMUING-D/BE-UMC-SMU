// models/Major.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Major = sequelize.define(
    'Major',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        majorName: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.TIMESTAMP,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.TIMESTAMP,
            allowNull: false,
        },
        deletedAt: {
            type: DataTypes.TIMESTAMP,
            allowNull: true,
        },
    },
    {
        tableName: 'major',
        paranoid: true,
    }
);

// Major 모델과 User 모델 간의 관계 설정
Major.hasMany(User, { foreignKey: 'majorId' });

module.exports = Major;
