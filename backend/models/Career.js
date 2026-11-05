const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    department: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'],
      default: 'Full-time',
    },
    description: { type: String, required: true },
    requirements: [{ type: String }],
    responsibilities: [{ type: String }],
    salaryRange: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
    postedDate: { type: Date, default: Date.now },
    deadline: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Career', careerSchema);
