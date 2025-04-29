const express  = require('express');
const router   = express.Router();
const auth     = require('../middlewares/authMiddleware');
const ctl      = require('../controllers/notificationController');

router.use(auth);

// GET    /api/notifications         → list all for current user
router.get('/', ctl.getNotifications);

// PUT    /api/notifications/:id/read → mark one as read
router.put('/:id/read', ctl.markAsRead);

module.exports = router;
