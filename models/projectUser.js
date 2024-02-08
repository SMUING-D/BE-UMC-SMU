const {Sequelize} = require('sequelize');

module.exports = class ProjectUser extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },
                userId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                projectId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
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
                modelName: 'ProjectUser',
                tableName: 'projectUser',
                timestamps: true,
                paranoid: true,
            }
        );
    }
    static associate(db) {
        // ProjectUser 모델과 Project 모델 간의 다대일 관계 설정
        ProjectUser.belongsTo(db.Project, { foreignKey: 'projectId' });

        // ProjectUser 모델과 User 모델 간의 다대일 관계 설정
        ProjectUser.belongsTo(db.User, { foreignKey: 'userId' });
        
        // ProjectUser 모델과 Member 모델 간의 다대일 관계 설정
        ProjectUser.belongsTo(db.Member, { foreignKey: 'userId' });
    }
};
