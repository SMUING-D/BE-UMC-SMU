const { Sequelize } = require('sequelize');

module.exports = class Answer extends Sequelize.Model {
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

                formId: {
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
                modelName: 'Answer',
                tableName: 'answer',
                timestamps: true,
                paranoid: true,
            }
        );
    }
    static associate(db) {
        // Answer 모델과 Question 모델 간의 다대일 관계 설정
        Answer.belongsTo(db.Question, { foreignKey: 'questionId' });

        // Answer 모델과 User 모델 간의 다대일 관계 설정
        Answer.belongsTo(db.User, { foreignKey: 'userId' });

        // Answer 모델과 Form 모델 간의 다대일 관계 설정
        Answer.belongsTo(db.Form, { foreignKey: 'formId' });
    }
};
