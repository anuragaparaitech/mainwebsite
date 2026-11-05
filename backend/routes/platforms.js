const express = require('express');
const router = express.Router();
const Platform = require('../models/Platform');
const { protect } = require('../middleware/auth');

router.get('/', protect, async (req, res) => {
  try {
    const platforms = await Platform.find().sort({ order: 1, createdAt: -1 });
    res.json(platforms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', protect, async (req, res) => {
  try {
    const platform = await Platform.findById(req.params.id);
    if (!platform) return res.status(404).json({ message: 'Platform not found' });
    res.json(platform);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', protect, async (req, res) => {
  try {
    const platform = new Platform(req.body);
    const saved = await platform.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const updated = await Platform.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: 'Platform not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    const platform = await Platform.findByIdAndDelete(req.params.id);
    if (!platform) return res.status(404).json({ message: 'Platform not found' });
    res.json({ message: 'Platform deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
