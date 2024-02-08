const {Sequelize} = require('sequelize');
const env = process.env.NODE_ENV  || 'development';
const config = require('../config/config.js')[env];

const Major = require('./major.js');
const Role = require('./role.js');
const User = require('./umcUser.js');
const Project = require('./project.js');
const Notice = require('./notice.js');
const Image = require('./image.js');
const ProjectUser = require('./projectUser.js');
const Member = require('./umcMember.js');

const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Major = Major;
db.Role = Role;
db.User = User;
db.Notice = Notice;
db.Project = Project;
db.Image = Image;
db.ProjectUser = ProjectUser;
db.Member = Member;

Major.init(sequelize);
Role.init(sequelize);
User.init(sequelize);
Notice.init(sequelize);
Project.init(sequelize);
Image.init(sequelize);
ProjectUser.init(sequelize);
Member.init(sequelize);

Major.associate(db);
Role.associate(db);
User.associate(db);
Notice.associate(db);
Project.associate(db);
Image.associate(db);
ProjectUser.associate(db);
Member.associate(db);

// export default db;
module.exports = db
