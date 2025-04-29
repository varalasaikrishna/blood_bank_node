const { Post, User, Notification } = require('../models');

exports.createPost = async (req, res) => {
  const { message, blood_group } = req.body;
  if (!message || !blood_group) {
    return res.status(400).json({ message: 'Both fields required' });
  }

  // 1️⃣ create the forum post
  const post = await Post.create({
    user_id:     req.user.id,
    message,
    blood_group
  });

  // 2️⃣ find all users with that blood_group (except creator)
  const recipients = await User.findAll({
    where: { blood_group },
    attributes: ['id']
  });

  // 3️⃣ bulkCreate a “post_request” notification for each
  await Notification.bulkCreate(
    recipients
      .filter(u => u.id !== req.user.id)
      .map(u => ({
        user_id: u.id,
        post_id: post.id,
        type:    'post_request'
      }))
  );

  res.status(201).json(post);
};

exports.getAllPosts = async (_, res) => {
  try {
    const posts = await Post.findAll({
      order: [['createdAt','DESC']]
    });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load posts' });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch post' });
  }
};

