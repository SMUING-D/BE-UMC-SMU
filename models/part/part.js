const { Sequelize } = require('sequelize');

module.exports = class Part extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },
                name: {
                    type: Sequelize.STRING(50),
                    allowNull: false,
                },
            },
            {
                sequelize,
                modelName: 'Part',
                tableName: 'Part',
                timestamps: true,
                paranoid: true,
            }
        );
    }

    static associate(db) {
        // Part 모델과 UserPart 모델 간의 다대다 관계 설정
        Part.belongsToMany(db.User, { through: 'UserPart', foreignKey: 'partId' });
    }
};
