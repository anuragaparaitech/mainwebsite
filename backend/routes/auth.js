const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const { protect } = require('../middleware/auth');

// Generate JWT token
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// @route   POST /api/auth/login
// @desc    Admin login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email: email.toLowerCase() });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({
      token: generateToken(admin._id),
      admin: { id: admin._id, name: admin.name, email: admin.email },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/auth/me
// @desc    Get current admin profile
router.get('/me', protect, async (req, res) => {
  res.json(req.admin);
});

// @route   PUT /api/auth/profile
// @desc    Update admin name and/or email
router.put('/profile', protect, async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    // Check if email is taken by another admin
    const existing = await Admin.findOne({
      email: email.toLowerCase(),
      _id: { $ne: req.admin._id },
    });
    if (existing) {
      return res.status(400).json({ message: 'Email is already in use' });
    }

    const updated = await Admin.findByIdAndUpdate(
      req.admin._id,
      { name: name.trim(), email: email.toLowerCase().trim() },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({ message: 'Profile updated successfully', admin: updated });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/auth/change-password
// @desc    Change admin password
router.put('/change-password', protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Both passwords are required' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'New password must be at least 6 characters' });
    }

    // Must fetch with password field to compare
    const admin = await Admin.findById(req.admin._id);
    const isMatch = await admin.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    admin.password = newPassword; // pre-save hook will hash it
    await admin.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
