const { Sequelize } = require('sequelize');

module.exports = class Form extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },
                year: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                title: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                userId: {
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
                modelName: 'Form',
                tableName: 'form',
                timestamps: true,
                paranoid: true,
            }
        );
    }
    static associate(db) {
        // Form 모델과 Question 모델 간의 일대다 관계 설정
        Form.hasMany(db.Question, { foreignKey: 'formId' });

        // Form 모델과 User 모델 간의 다대일 관계 설정
        Form.belongsTo(db.User, { foreignKey: 'userId' });

        // Form 모델과 SubmittedForms 모델 간의 일대다 관계 설정
        Form.hasMany(db.SubmitForms, { foreignKey: 'formId' });
    }
};
