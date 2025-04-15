const { Donation } = require('../models');

// ✅ Create a new donation
exports.createDonation = async (req, res) => {
  try {
    const { donor_name, location, blood_group, quantity } = req.body;

    if (!donor_name || !location || !blood_group || !quantity) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const donation = await Donation.create({
      donor_name,
      location,
      blood_group,
      quantity,
      user_id: req.user?.id || null, // requires auth middleware
    });

    res.status(201).json(donation);
  } catch (err) {
    console.error('Create Donation Error:', err);
    res.status(500).json({ message: 'Failed to create donation' });
  }
};

// ✅ Get all donations (for admin view)
exports.getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.findAll({
      order: [['donated_at', 'DESC']],
    });

    res.json(donations);
  } catch (err) {
    console.error('Get Donations Error:', err);
    res.status(500).json({ message: 'Failed to load donations' });
  }
};

// 🗑 Optional: Delete a donation (admin only)
exports.deleteDonation = async (req, res) => {
  try {
    const donation = await Donation.findByPk(req.params.id);
    if (!donation) return res.status(404).json({ message: 'Donation not found' });

    await donation.destroy();
    res.json({ message: 'Donation deleted successfully' });
  } catch (err) {
    console.error('Delete Donation Error:', err);
    res.status(500).json({ message: 'Failed to delete donation' });
  }
};

// 📝 Optional: Get donation by ID
exports.getDonationById = async (req, res) => {
  try {
    const donation = await Donation.findByPk(req.params.id);
    if (!donation) return res.status(404).json({ message: 'Donation not found' });

    res.json(donation);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get donation' });
  }
};
