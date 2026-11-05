const express = require('express');
const router = express.Router();
const Career = require('../models/Career');
const { protect } = require('../middleware/auth');

// GET all careers
router.get('/', protect, async (req, res) => {
  try {
    const careers = await Career.find().sort({ createdAt: -1 });
    res.json(careers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single career
router.get('/:id', protect, async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);
    if (!career) return res.status(404).json({ message: 'Career not found' });
    res.json(career);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create career
router.post('/', protect, async (req, res) => {
  try {
    const career = new Career(req.body);
    const saved = await career.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update career
router.put('/:id', protect, async (req, res) => {
  try {
    const updated = await Career.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: 'Career not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE career
router.delete('/:id', protect, async (req, res) => {
  try {
    const career = await Career.findByIdAndDelete(req.params.id);
    if (!career) return res.status(404).json({ message: 'Career not found' });
    res.json({ message: 'Career deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
