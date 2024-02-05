// models/Major.js

const {Sequelize} = require('sequelize');

module.exports = class Major extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },
                majorName: {
                    type: Sequelize.STRING(50),
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
                modelName: 'Major',
                tableName: 'major',
                timestamps: true,
                paranoid: true,
            }
        );
    }
    static associate(db) {
        // Major 모델과 User 모델 간의 관계 설정
        Major.hasMany(db.User, { foreignKey: 'majorId' });
    }
};
