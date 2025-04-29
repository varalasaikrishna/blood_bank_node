const express = require('express');
const router  = express.Router();
const ctl     = require('../controllers/contactController');
const auth    = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/authorizeRole');

// Public endpoint: submit “Contact Us” form
// POST /api/contact
router.post('/', ctl.submitContact);

// Admin endpoints (protected)
router.use(auth, authorize('admin'));

// GET  /api/contact           → list all submissions
router.get('/', ctl.getAllContacts);

// DELETE /api/contact/:id     → delete a submission
router.delete('/:id', ctl.deleteContact);

module.exports = router;
