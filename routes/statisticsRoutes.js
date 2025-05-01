const express = require('express');
const router  = express.Router();
const auth    = require('../middlewares/authMiddleware');
const authorizeRole = require('../middlewares/authorizeRole');
const statsCtl     = require('../controllers/statisticsController');

router.get(
  '/regions',
  auth,
  authorizeRole('admin'),
  statsCtl.getRegionStats
);

router.get(
  '/blood-groups',
  auth,
  authorizeRole('admin'),
  statsCtl.getBloodGroupStats
);

module.exports = router;
