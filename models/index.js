const Sequelize = require('sequelize');
const User = require('./user');
const Review = require('./review');
const Store = require('./store');
const Waiting = require('./waiting');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
    config.database, config.username, config.password, config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Review = Review;
db.Store = Store;
db.Waiting = Waiting;

User.init(sequelize);
Review.init(sequelize);
Store.init(sequelize);
Waiting.init(sequelize);

User.associate(db);
Review.associate(db);
Store.associate(db);
Waiting.associate(db);

module.exports = db;


