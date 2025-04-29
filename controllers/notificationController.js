const { Notification } = require('../models');

exports.getNotifications = async (req, res) => {
  const notes = await Notification.findAll({
    where: { user_id: req.user.id },
    order: [['createdAt','DESC']]
  });
  res.json(notes);
};

exports.markAsRead = async (req, res) => {
  const note = await Notification.findByPk(req.params.id);
  if (!note) return res.status(404).json({ message: 'Not found' });
  note.is_read = true;
  await note.save();
  res.json(note);
};
