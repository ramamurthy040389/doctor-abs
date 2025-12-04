const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');

function overlap(aStart, aEnd, bStart, bEnd) {
  return aStart < bEnd && bStart < aEnd;
}

exports.bookAppointment = async ({ doctorId, patientId, startAt, reason }) => {
  // convert startAt to Date
  const start = new Date(startAt);

  const doctor = await Doctor.findById(doctorId);
  if (!doctor) throw new Error('Doctor not found');

  const slotMs = (doctor.slotMinutes || 30) * 60 * 1000;
  const end = new Date(start.getTime() + slotMs);

  // check within work hours if provided (optional)
  // check overlapping appointments
  const conflicts = await Appointment.findOne({
    doctor: doctorId,
    $or: [
      { startAt: { $lt: end }, endAt: { $gt: start } } // overlap
    ],
    status: { $in: ['booked'] }
  });

  if (conflicts) throw new Error('Slot not available');

  const appt = await Appointment.create({
    doctor: doctorId, patient: patientId, startAt: start, endAt: end, reason
  });
  return appt;
};
