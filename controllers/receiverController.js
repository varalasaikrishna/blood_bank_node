const { Receiver } = require('../models');

// Create a new request
exports.createReceiver = async (req, res) => {
  try {
    const { receiver_name, contact, blood_group, quantity } = req.body;

    if (!receiver_name || !contact || !blood_group || !quantity) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const request = await Receiver.create({
      receiver_name,
      contact,
      blood_group,
      quantity,
      user_id: req.user?.id || null,
    });

    res.status(201).json(request);
  } catch (err) {
    console.error('Create Receiver Error:', err);
    res.status(500).json({ message: 'Failed to submit request' });
  }
};

// Get all requests
exports.getAllReceivers = async (req, res) => {
  try {
    const requests = await Receiver.findAll({ order: [['requested_at', 'DESC']] });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch requests' });
  }
};

// Update status (admin)
exports.updateReceiverStatus = async (req, res) => {
  try {
    const request = await Receiver.findByPk(req.params.id);
    if (!request) return res.status(404).json({ message: 'Not found' });

    request.status = req.body.status || request.status;
    await request.save();

    res.json(request);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update status' });
  }
};

// Delete request
exports.deleteReceiver = async (req, res) => {
  try {
    const request = await Receiver.findByPk(req.params.id);
    if (!request) return res.status(404).json({ message: 'Request not found' });

    await request.destroy();
    res.json({ message: 'Request deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete request' });
  }
};
