const {Sequelize} = require('sequelize');

module.exports = class User extends Sequelize.Model {
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
                password: {
                    type: Sequelize.STRING(100),
                    allowNull: true,
                },
                email: {
                    type: Sequelize.STRING(50),
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
                roleId: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    defaultValue: 1,
                },
                profileImgUrl: {
                    type: Sequelize.STRING(2084),
                    allowNull: true,
                },
                verificationCode: {
                    type: Sequelize.STRING(50),
                    allowNull: true,
                },
                isVerified: {
                    type: Sequelize.BOOLEAN,
                    allowNull: true,
                    defaultValue: false,
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
                modelName: 'User',
                tableName: 'User',
                timestamps: true,
                paranoid: true,
            }
        );
    }
    static associate(db) {
        // User 모델과 Major 모델 간의 다대일 관계 설정
        User.belongsTo(db.Major, { foreignKey: 'majorId' });

        // User 모델과 Role 모델 간의 다대일 관계 설정
        User.belongsTo(db.Role, { foreignKey: 'roleId' });
    }
};
