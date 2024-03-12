const {Sequelize} = require('sequelize');

module.exports = class Image extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },
                directory: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
                contentId: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                location: {
                    type: Sequelize.STRING(2084),
                    allowNull: true,
                },
                createdAt: {
                    type: Sequelize.DATE,
                    allowNull: true,
                },
                updatedAt: {
                    type: Sequelize.DATE,
                    allowNull: true,
                },
                deletedAt: {
                    type: Sequelize.DATE,
                    allowNull: true,
                },
            },
            {
                sequelize,
                modelName: 'Image',
                tableName: 'image',
                timestamps: true,
                paranoid: true,
            }
        );
    }
    static associate(db) {
    }
};