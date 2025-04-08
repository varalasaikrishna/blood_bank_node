const sequelize = require('../config/db');
const User = require('./user');
const BloodBank = require('./bloodbank');

const syncDB = async () => {
  await sequelize.sync({ alter: true });
};

module.exports = {
  sequelize,
  User,
  BloodBank,
  syncDB
};
