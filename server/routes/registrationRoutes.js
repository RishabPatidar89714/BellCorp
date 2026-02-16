const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  registerForEvent,
  cancelRegistration,
  getUserRegistrations
} = require('../controllers/registrationController');
router.post('/', protect, registerForEvent);
router.get('/me', protect, getUserRegistrations);
router.delete('/:registrationId', protect, cancelRegistration);

module.exports = router;