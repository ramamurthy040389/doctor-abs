const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  startAt: { type: Date, required: true },
  endAt: { type: Date, required: true },
  status: { type: String, enum: ['booked','completed','cancelled'], default: 'booked' },
  reason: String
}, { timestamps: true });

appointmentSchema.index({ doctor: 1, startAt: 1, endAt: 1 });

module.exports = mongoose.model('Appointment', appointmentSchema);
