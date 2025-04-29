const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Comment = sequelize.define('Comment', {
  post_id: { type: DataTypes.INTEGER, allowNull: false },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  comment: { type: DataTypes.TEXT,    allowNull: false },
}, {
  tableName: 'Comments'
});

module.exports = Comment;
