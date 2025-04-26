const express     = require('express');
const router      = express.Router();
const auth        = require('../middlewares/authMiddleware');
const authorize   = require('../middlewares/authorizeRole');
const donationCtl = require('../controllers/donationController');
const receiverCtl = require('../controllers/receiverController');

// All admin routes require a valid JWT and admin role
router.use(auth, authorize('admin'));

// ─── Donations ────────────────────────────────────────────────────────────────
// GET    /api/admin/donations          → list all donations
router.get('/donations', donationCtl.getAllDonations);

// DELETE /api/admin/donations/:id      → delete a donation
router.delete('/donations/:id', donationCtl.deleteDonation);

// ─── Receivers (Blood Requests) ──────────────────────────────────────────────
// GET    /api/admin/receivers          → list all blood-request entries
router.get('/receivers', receiverCtl.getAllReceivers);

// PUT    /api/admin/receivers/:id/status → approve or decline a request
router.put('/receivers/:id/status', receiverCtl.updateReceiverStatus);

// DELETE /api/admin/receivers/:id        → delete a blood request
router.delete('/receivers/:id', receiverCtl.deleteReceiver);

module.exports = router;
