const appointmentService = require('../services/appointmentService');

exports.book = async (req, res, next) => {
  try {
    const data = {
      doctorId: req.body.doctorId,
      patientId: req.user._id,
      startAt: req.body.startAt,
      reason: req.body.reason
    };
    const appt = await appointmentService.bookAppointment(data);
    res.status(201).json({ success: true, data: appt });
  } catch (err) { next(err); }
};
