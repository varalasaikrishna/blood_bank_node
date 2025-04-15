const express = require('express');
const router = express.Router();
const controller = require('../controllers/donationController');
const auth = require('../middlewares/authMiddleware');

router.post('/', auth, controller.createDonation); // requires login
router.get('/', auth, controller.getAllDonations); // admin view
router.get('/:id', auth, controller.getDonationById); // optional
router.delete('/:id', auth, controller.deleteDonation); // optional

module.exports = router;
