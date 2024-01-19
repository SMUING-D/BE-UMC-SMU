// models/Role.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Role = sequelize.define(
    'Role',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        roleName: {
            type: DataTypes.STRING(20),
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
        tableName: 'role',
        paranoid: true,
    }
);

module.exports = Role;
