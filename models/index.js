const sequelize = require('../config/db');
const User = require('./user');
const BloodBank = require('./bloodbank');
const Donation = require('./donation');
const Receiver = require('./receiver');

// 🧩 Optional: Define associations
Donation.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Receiver.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

const syncDB = async () => {
  await sequelize.sync({ alter: true });
};

module.exports = {
  sequelize,
  User,
  BloodBank,
  Donation,
  Receiver,
  syncDB
};
