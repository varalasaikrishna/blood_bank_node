require('dotenv').config();
const express = require('express');
const app = express();
const sequelize = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const bloodbankRoutes = require('./routes/bloodbankRoutes');
const donationRoutes = require('./routes/donationRoutes');

const receiverRoutes = require('./routes/receiverRoutes');

const cors = require('cors');
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use('/api/users', userRoutes);
app.use('/api/bloodbanks', bloodbankRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/receivers', receiverRoutes);
const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
