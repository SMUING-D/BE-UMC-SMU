const { Sequelize } = require('sequelize');

module.exports = class Response extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },
                content: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },

                userId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },

                questionId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },

                createdAt: {
                    type: Sequelize.DATE,
                    allowNull: false,
                },
                updatedAt: {
                    type: Sequelize.DATE,
                    allowNull: false,
                },
                deletedAt: {
                    type: Sequelize.DATE,
                    allowNull: true,
                },
            },
            {
                sequelize,
                modelName: 'Response',
                tableName: 'response',
                timestamps: true,
                paranoid: true,
            }
        );
    }
    static associate(db) {
        // Response 모델과 Question 모델 간의 다대일 관계 설정
        Response.belongsTo(db.Question, { foreignKey: 'questionId' });

        // Response 모델과 User 모델 간의 다대일 관계 설정
        Response.belongsTo(db.User, { foreignKey: 'userId' });

        // Response 모델과 Form 모델 간의 다대일 관계 설정
        Response.belongsTo(db.Form, { foreignKey: 'formId' });
    }
};
