const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Post = sequelize.define('Post', {
  user_id:    { type: DataTypes.INTEGER, allowNull: false },
  message:    { type: DataTypes.TEXT,    allowNull: false },
  blood_group:{ type: DataTypes.ENUM('A+','A-','B+','B-','AB+','AB-','O+','O-'), allowNull: false },
}, {
  tableName: 'Posts'
});

module.exports = Post;