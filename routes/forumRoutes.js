const express = require('express');
const router  = express.Router();
const auth    = require('../middlewares/authMiddleware');
const ctl     = require('../controllers/forumController');

router.post('/',    auth, ctl.createPost);
router.get('/',     auth, ctl.getAllPosts);
router.get('/:id',  auth, ctl.getPostById);

module.exports = router;
