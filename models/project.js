const {Sequelize} = require('sequelize');

module.exports = class Project extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },
                roleId: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                title: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
                content: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
                startDate: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
                endDate: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
                frontEnd: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
                backEnd: {
                    type: Sequelize.STRING,
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
                modelName: 'Project',
                tableName: 'project',
                timestamps: true,
                paranoid: true,
            }
        );
    }
    static associate(db) {
        // Project 모델과 Role 모델 간의 다대일 관계 설정
        Project.belongsTo(db.Role, { foreignKey: 'roleId' });
    }
};