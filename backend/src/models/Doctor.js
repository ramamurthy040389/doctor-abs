const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  specialization: String,
  experienceYears: Number,
  // working hours example: { start: '09:00', end: '17:00' }
  workHours: {
    start: String,
    end: String
  },
  slotMinutes: { type: Number, default: 30 } // slot size
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);
