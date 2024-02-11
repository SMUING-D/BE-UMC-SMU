const { Sequelize } = require('sequelize');

module.exports = class Question extends Sequelize.Model {
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
                type: {
                    type: Sequelize.ENUM('SHORT,LONG,SINGLE,MULTIPLE,UPLOAD'),
                    allowNull: false,
                },
                IsEmpty: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    default: false, //기본값은 빈 값 안됨
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
                modelName: 'Question',
                tableName: 'question',
                timestamps: true,
                paranoid: true,
            }
        );
    }
    static associate(db) {
        Question.belongsTo(db.Form, { foreignKey: 'formId' });
        Question.hasMany(db.Options, { foreignKey: 'questionId' });
    }
};
