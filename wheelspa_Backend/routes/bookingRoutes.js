const express = require('express');
const router = express.Router();
const { createBooking, getAllBookings, deleteBooking, getBookingsByContact, getUserBookings } = require('../controllers/bookingController');

router.get('/', getAllBookings);
router.delete('/:id', deleteBooking);
router.get('/by-contact/:value',getBookingsByContact);
router.get('/user', getUserBookings);
router.post('/', createBooking);

module.exports = router;
