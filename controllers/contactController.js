const Contact = require('../models/contact');

// User submits the contact form
exports.submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    const contact = await Contact.create({ name, email, message });
    res.status(201).json({ message: 'Thank you! Your message has been received.', contact });
  } catch (err) {
    console.error('Contact submission error:', err);
    res.status(500).json({ message: 'Failed to submit message.' });
  }
};

// Admin: list all messages
exports.getAllContacts = async (req, res) => {
  try {
    const messages = await Contact.findAll({ order: [['createdAt','DESC']] });
    res.json(messages);
  } catch (err) {
    console.error('Fetch contacts error:', err);
    res.status(500).json({ message: 'Failed to load messages.' });
  }
};

// Admin: delete a message
exports.deleteContact = async (req, res) => {
  try {
    const msg = await Contact.findByPk(req.params.id);
    if (!msg) return res.status(404).json({ message: 'Message not found.' });
    await msg.destroy();
    res.json({ message: 'Message deleted.' });
  } catch (err) {
    console.error('Delete contact error:', err);
    res.status(500).json({ message: 'Failed to delete message.' });
  }
};
