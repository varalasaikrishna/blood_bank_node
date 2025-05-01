const { BloodBank, sequelize } = require('../models');
const { fn, col } = require('sequelize');

exports.getRegionStats = async (req, res) => {
  try {
    const rows = await BloodBank.findAll({
      attributes: [
        'location',
        [ fn('SUM', col('quantity')), 'total' ]
      ],
      group: ['location'],
      order: [['location','ASC']]
    });
    // map to plain JSON
    const data = rows.map(r => ({
      location: r.location,
      total:    parseInt(r.get('total'), 10)
    }));
    res.json(data);
  } catch (err) {
    console.error('Region stats error:', err);
    res.status(500).json({ error: 'Failed to compute region stats' });
  }
};

exports.getBloodGroupStats = async (req, res) => {
  try {
    const rows = await BloodBank.findAll({
      attributes: [
        'blood_group',
        [ fn('SUM', col('quantity')), 'total' ]
      ],
      group: ['blood_group'],
      order: [['blood_group','ASC']]
    });
    const data = rows.map(r => ({
      blood_group: r.blood_group,
      total:       parseInt(r.get('total'), 10)
    }));
    res.json(data);
  } catch (err) {
    console.error('Blood-group stats error:', err);
    res.status(500).json({ error: 'Failed to compute blood-group stats' });
  }
};
