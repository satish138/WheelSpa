const express = require('express');
const router = express.Router();
const { createBooking, getAllBookings, deleteBooking, getBookingsByContact, getUserBookings, cancelBooking } = require('../controllers/bookingController');



router.delete('/:bookingId/cancel', cancelBooking);
router.get('/', getAllBookings);
router.delete('/:id', deleteBooking);
router.get('/by-contact/:value',getBookingsByContact);
router.get('/user', getUserBookings);
router.post('/', createBooking);

module.exports = router;
