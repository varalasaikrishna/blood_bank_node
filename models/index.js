// models/index.js

const sequelize      = require('../config/db');
const User           = require('./user');
const BloodBank      = require('./bloodbank');
const Donation       = require('./donation');
const Receiver       = require('./receiver');
const Post           = require('./post');
const Comment        = require('./comment');
const Notification   = require('./notification');

// ─── Associations ──────────────────────────────────────────────────────────────
// User ↔ Donation
User.hasMany(Donation,  { foreignKey: 'user_id', as: 'donations' });
Donation.belongsTo(User,{ foreignKey: 'user_id', as: 'user' });

// User ↔ Receiver
User.hasMany(Receiver,  { foreignKey: 'user_id', as: 'requests' });
Receiver.belongsTo(User,{ foreignKey: 'user_id', as: 'user' });

// User ↔ Post (forum)
User.hasMany(Post,      { foreignKey: 'user_id', as: 'posts' });
Post.belongsTo(User,    { foreignKey: 'user_id', as: 'author' });

// Post ↔ Comment
Post.hasMany(Comment,   { foreignKey: 'post_id', as: 'comments' });
Comment.belongsTo(Post, { foreignKey: 'post_id', as: 'post' });

// User ↔ Comment
User.hasMany(Comment,   { foreignKey: 'user_id', as: 'comments' });
Comment.belongsTo(User, { foreignKey: 'user_id', as: 'author' });

// Post ↔ Notification
Post.hasMany(Notification,    { foreignKey: 'post_id', as: 'notifications' });
Notification.belongsTo(Post,  { foreignKey: 'post_id', as: 'post' });

// User ↔ Notification
User.hasMany(Notification,     { foreignKey: 'user_id', as: 'notifications' });
Notification.belongsTo(User,   { foreignKey: 'user_id', as: 'recipient' });

// ─── Sync Helper ───────────────────────────────────────────────────────────────
const syncDB = async () => {
  await sequelize.sync({ alter: true });
};

module.exports = {
  sequelize,
  syncDB,
  User,
  BloodBank,
  Donation,
  Receiver,
  Post,
  Comment,
  Notification,
};
