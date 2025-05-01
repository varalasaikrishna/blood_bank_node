require('dotenv').config();
const express = require('express');
const app = express();
const sequelize = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const bloodbankRoutes = require('./routes/bloodbankRoutes');
const donationRoutes = require('./routes/donationRoutes');
const adminRoutes = require('./routes/adminRoutes');
const contactRoutes   = require('./routes/contactRoutes');
const receiverRoutes = require('./routes/receiverRoutes');
const forumRoutes        = require('./routes/forumRoutes');
const commentRoutes      = require('./routes/commentRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const statsRoutes    = require('./routes/statisticsRoutes');

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
app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/forum',         forumRoutes);
app.use('/api/forum',         commentRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/admin/stats', statsRoutes);

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
