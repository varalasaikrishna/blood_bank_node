const express = require('express');
const router  = express.Router();
const auth    = require('../middlewares/authMiddleware');
const ctl     = require('../controllers/commentController');

router.post('/:postId/comments',    auth, ctl.createComment);
router.get('/:postId/comments',     auth, ctl.getCommentsByPost);

module.exports = router;
