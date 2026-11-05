const mongoose = require('mongoose');

const collaborationSchema = new mongoose.Schema(
  {
    partnerName: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    logo: { type: String, default: '' },
    website: { type: String, default: '' },
    type: {
      type: String,
      enum: ['Technology', 'Business', 'Research', 'NGO', 'Government', 'Other'],
      default: 'Business',
    },
    startDate: { type: Date },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Collaboration', collaborationSchema);
