const Doctor = require('../modals/doctor');
const jwt = require('jsonwebtoken');
const Patient = require('../modals/patient');

module.exports.registerDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.create(req.body);
    res.status(200).json({
      success: true,
      message: 'Doctor created!!!',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Could not create doctor',
    });
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const user = Doctor.find(req.body);
    if (user) {
      const token = jwt.sign(user.id, 'mySecret');
      res.status(200).json({
        success: true,
        token,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Name or password do not match',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Can't login ",
    });
  }
};

module.exports.registerPatients = async (req, res, next) => {
  try {
    req.body.doctor = '6448197b1e177c9a89f0819a';
    const patient = await Patient.create(req.body);

    res.status(200).json({
      success: true,
      message: 'Successfully created patients',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Could not create patient',
    });
  }
};

module.exports.createReport = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id);
    req.body.date = Date.now();
    patient.reports.push(req.body);
    patient.save();
    res.status(200).json({
      success: true,
      message: 'Report submitted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Could not create a report',
    });
  }
};

module.exports.allReports = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id);
    res.status(200).json({
      success: true,
      message: patient.reports,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Could not fetch the reports',
    });
  }
};

module.exports.AllReports = async (req, res, next) => {
  try {
    const patient = await Patient.find({
      reports: { $elemMatch: { status: req.params.status } },
    });
    res.status(200).json({
      success: true,
      data: patient,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Could not able to fetch reports',
    });
  }
};
