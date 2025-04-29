const { Comment, Post, Notification } = require('../models');

exports.createComment = async (req, res) => {
  const { comment } = req.body;
  const postId      = req.params.postId;
  if (!comment) return res.status(400).json({ message: 'Comment required' });

  const post = await Post.findByPk(postId);
  if (!post) return res.status(404).json({ message: 'Post not found' });

  // 1️⃣ create the comment
  const newComment = await Comment.create({
    post_id: postId,
    user_id: req.user.id,
    comment
  });

  // 2️⃣ notify the post’s author (if not self)
  if (post.user_id !== req.user.id) {
    await Notification.create({
      user_id: post.user_id,
      post_id,
      type:    'comment'
    });
  }

  res.status(201).json(newComment);
};

exports.getCommentsByPost = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { post_id: req.params.postId },
      order: [['createdAt','ASC']]
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load comments' });
  }
};
