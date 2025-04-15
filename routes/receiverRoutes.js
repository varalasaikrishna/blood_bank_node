const express = require('express');
const router = express.Router();
const controller = require('../controllers/receiverController');
const auth = require('../middlewares/authMiddleware');

router.post('/', auth, controller.createReceiver);
router.get('/', auth, controller.getAllReceivers);
router.put('/:id/status', auth, controller.updateReceiverStatus);
router.delete('/:id', auth, controller.deleteReceiver);

module.exports = router;
