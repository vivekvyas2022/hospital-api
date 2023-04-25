const express = require('express');
const {
  registerDoctor,
  registerPatients,
  createReport,
  allReports,
  AllReports,
  login,
} = require('../controllers/UserController');
const passport = require('passport');

const router = express.Router();
router.post('/doctors/register', registerDoctor);

router.post('/login', login);

router.post(
  '/patients/register',
  passport.authenticate('jwt', { session: false }),
  registerPatients
);
router.post(
  '/patients/:id/create-report',
  passport.authenticate('jwt', { session: false }),
  createReport
);
router.get('/patients/:id/all-report', allReports);
router.get('/reports/:status', AllReports);

module.exports = router;
