const express = require('express');
const router = express.Router();
const controller = require('../controllers/bloodbankController');

router.get('/', controller.getAllBloodBanks);
router.get('/:id', controller.getBloodBankById);
router.post('/', controller.createBloodBank);
router.put('/:id', controller.updateBloodBank);
router.delete('/:id', controller.deleteBloodBank);

module.exports = router;
