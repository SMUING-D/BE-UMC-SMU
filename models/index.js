const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];

const Major = require('./major');
const Role = require('./role');
const User = require('./umcUser');

const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Major = Major;
db.Role = Role;
db.User = User;

Major.init(sequelize);
Role.init(sequelize);
User.init(sequelize);

Major.associate(db);
Role.associate(db);
User.associate(db);

module.exports = db;
