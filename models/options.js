const { Sequelize } = require('sequelize');

module.exports = class Options extends Sequelize.Model {
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
                modelName: 'Option',
                tableName: 'option',
                timestamps: true,
                paranoid: true,
            }
        );
    }

    static associate(db) {
        // Option 모델과 Question 모델 간의 다대일 관계 설정
        Options.belongsTo(db.Question, { foreignKey: 'questionId' });
    }
};
