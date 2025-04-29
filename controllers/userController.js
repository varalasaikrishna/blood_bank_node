const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
exports.registerUser = async (req, res) => {
  const {
    name,
    email,
    password,
    contact,
    address,
    gender,
    blood_group
  } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hash,
      contact,
      address,
      gender,
      blood_group
    });

    // Sign token including blood_group
    const accessToken = jwt.sign(
      {
        id:   user.id,
        role: user.role,
        name: user.name,
        blood_group: user.blood_group
      },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id:          user.id,
        name:        user.name,
        email:       user.email,
        contact:     user.contact,
        address:     user.address,
        gender:      user.gender,
        blood_group: user.blood_group
      },
      accessToken
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const accessToken = jwt.sign(
      {
        id:   user.id,
        role: user.role,
        name: user.name,
        blood_group: user.blood_group
      },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );
    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure:   true,
      sameSite: 'strict',
      maxAge:   7 * 24 * 60 * 60 * 1000
    });

    res.json({ accessToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Get all users (admin use)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Get single user
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] }
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Update user (profile)
exports.updateUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      contact,
      address,
      gender,
      blood_group     // ← pull from body
    } = req.body;

    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.name        = name        ?? user.name;
    user.email       = email       ?? user.email;
    user.contact     = contact     ?? user.contact;
    user.address     = address     ?? user.address;
    user.gender      = gender      ?? user.gender;
    user.blood_group = blood_group ?? user.blood_group;  // ← update

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    res.json({
      message: 'User updated',
      user: {
        id:          user.id,
        name:        user.name,
        email:       user.email,
        contact:     user.contact,
        address:     user.address,
        gender:      user.gender,
        blood_group: user.blood_group
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    await user.destroy();
    res.json({ message: 'User deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Refresh and logout remain unchanged...


exports.refreshToken = async (req, res) => {
  const refreshToken = req.cookies?.refreshToken || req.body.refreshToken;

  if (!refreshToken)
    return res.status(403).json({ message: 'No refresh token provided' });

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user || user.refreshToken !== refreshToken)
      return res.status(403).json({ message: 'Invalid or expired refresh token' });

    const newAccessToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(403).json({ message: 'Token invalid or expired' });
  }
};

exports.logout = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    user.refreshToken = null;
    await user.save();
    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
