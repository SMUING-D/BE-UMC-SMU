const { Sequelize } = require('sequelize');

module.exports = class UserPart extends Sequelize.Model {
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
                partId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                year: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
            },
            {
                sequelize,
                modelName: 'UserPart',
                tableName: 'UserPart',
                timestamps: true,
                paranoid: true,
            }
        );
    }
    static associate(db) {
        // UserPart 모델과 User 모델 간의 다대다 관계 설정
        UserPart.belongsTo(db.User, { foreignKey: 'userId' });
        UserPart.belongsTo(db.Part, { foreignKey: 'partId' });
    }
};
