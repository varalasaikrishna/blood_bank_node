// controllers/bloodbankController.js
const { BloodBank } = require('../models');

// Get all blood banks
exports.getAllBloodBanks = async (req, res) => {
  try {
    const banks = await BloodBank.findAll();
    res.json(banks);
  } catch (err) {
    console.error('Error fetching blood banks:', err);
    res.status(500).json({ error: 'Failed to load blood banks' });
  }
};

// Get one blood bank
exports.getBloodBankById = async (req, res) => {
  try {
    const bank = await BloodBank.findByPk(req.params.id);
    if (!bank) return res.status(404).json({ message: 'Not found' });
    res.json(bank);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new blood bank
exports.createBloodBank = async (req, res) => {
  try {
    const { name, location, contact, blood_group, quantity } = req.body;
    const newBank = await BloodBank.create({
      name,
      location,
      contact,
      blood_group,
      quantity,
    });
    res.status(201).json(newBank);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a blood bank
exports.updateBloodBank = async (req, res) => {
  try {
    const bank = await BloodBank.findByPk(req.params.id);
    if (!bank) return res.status(404).json({ message: 'Not found' });

    const { name, location, contact, blood_group, quantity } = req.body;

    bank.name = name ?? bank.name;
    bank.location = location ?? bank.location;
    bank.contact = contact ?? bank.contact;
    bank.blood_group = blood_group ?? bank.blood_group;
    bank.quantity = quantity ?? bank.quantity;

    await bank.save();
    res.json(bank);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a blood bank
exports.deleteBloodBank = async (req, res) => {
  try {
    const bank = await BloodBank.findByPk(req.params.id);
    if (!bank) return res.status(404).json({ message: 'Not found' });

    await bank.destroy();
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
