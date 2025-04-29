const express = require('express');
const router  = express.Router();
const auth    = require('../middlewares/authMiddleware');
const authorizeRole = require('../middlewares/authorizeRole');
const {
  getAllBloodBanks,
  getBloodBankById,
  createBloodBank,
  updateBloodBank,
  deleteBloodBank
} = require('../controllers/bloodbankController');

// Anyone logged in can view the list…
router.get('/',        auth, getAllBloodBanks);
// …or view one by id
router.get('/:id',     auth, getBloodBankById);

// Only admins may modify
router.post('/',       auth, authorizeRole('admin'), createBloodBank);
router.put('/:id',     auth, authorizeRole('admin'), updateBloodBank);
router.delete('/:id',  auth, authorizeRole('admin'), deleteBloodBank);

module.exports = router;
