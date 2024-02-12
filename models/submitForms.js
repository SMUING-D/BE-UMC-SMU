const { Sequelize } = require('sequelize');

module.exports = class SubmitForms extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },
                status: {
                    type: Sequelize.ENUM('제출 완료', '서류 합격', '최종 합격', '불합격'),
                    allowNull: false,
                    defaultValue: '제출 완료',
                },
                userId: {
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
                modelName: 'SubmitForms',
                tableName: 'submitForms',
                timestamps: true,
                paranoid: true,
            }
        );
    }

    static associate(db) {
        // Submit 모델과 User 모델 간의 다대일 관계 설정
        SubmitForms.belongsTo(db.User, { foreignKey: 'userId' });

        // Submit 모델과 Form 모델 간의 다대일 관계 설정
        SubmitForms.belongsTo(db.Form, { foreignKey: 'formId' });
    }
};
