const { Sequelize } = require('sequelize');

module.exports = class Selection extends Sequelize.Model {
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
                modelName: 'Selection',
                tableName: 'selection',
                timestamps: true,
                paranoid: true,
            }
        );
    }

    static associate(db) {
        // Selection 모델과 Question 모델 간의 다대일 관계 설정
        Selection.belongsTo(db.Question, { foreignKey: 'questionId' });
    }
};
