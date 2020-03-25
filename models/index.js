
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Comment = require('./comment')(sequelize, Sequelize);
db.Domain = require('./domain')(sequelize, Sequelize);

db.User.hasMany(db.Comment, {foreignKey : 'writer', sourceKey : 'id'});
db.Comment.belongsTo(db.User, {foreignKey : 'writer', targetKey : 'id' });

db.User.hasMany(db.Domain);
db.Domain.belongsTo(db.User);

module.exports = db;
