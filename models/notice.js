const Sequelize = require('sequelize');

module.exports = class Notice extends Sequelize.Model {
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
                modelName: 'Notice',
                tableName: 'notice',
                timestamps: true,
                paranoid: true,
            }
        );
    }
    static associate(db) {
        // Notice 모델과 Role 모델 간의 다대일 관계 설정
        Notice.belongsTo(db.Role, { foreignKey: 'roleId' });
    }
};