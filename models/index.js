const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];

const Major = require('./major');
const Role = require('./role');
const UmcUser = require('./umcUser.js');

const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Major = Major;
db.Role = Role;
db.UmcUser = UmcUser;

Major.init(sequelize);
Role.init(sequelize);
UmcUser.init(sequelize);

module.exports = db;
