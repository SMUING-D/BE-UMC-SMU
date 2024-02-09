const {Sequelize} = require('sequelize');

module.exports = class Member extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },
                studentId: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                name: {
                    type: Sequelize.STRING(15),
                    allowNull: true,
                },
                nickname: {
                    type: Sequelize.STRING(30),
                    allowNull: true,
                },
                majorId: {
                    type: Sequelize.INTEGER,
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
                modelName: 'Member',
                tableName: 'member',
                timestamps: true,
                paranoid: true,
            }
        );
    }
    static associate(db) {
        // User 모델과 Major 모델 간의 다대일 관계 설정
        Member.belongsTo(db.Major, { foreignKey: 'majorId' });

        // User 모델과 ProjectUser 모델 간의 일대다 관계 설정
        Member.hasMany(db.ProjectUser, { foreignKey: 'userId' });
    }
};
