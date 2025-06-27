const Booking = require('../models/Booking');
const nodemailer = require('nodemailer');

exports.createBooking = async (req, res) => {
  try {
    const { name, phone, email, service, date, time } = req.body;

    if (!name || !phone || !email || !service || !date || !time) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // ❌ Check for duplicate slot
    const existingBooking = await Booking.findOne({ date, time });
    if (existingBooking) {
      return res.status(409).json({ message: 'This time slot is already booked. Please choose another one.' });
    }

    // ✅ Save booking
    const newBooking = new Booking({ name, phone, email, service, date, time });
    await newBooking.save();

    // ✅ Setup transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASS
      }
    });

    // ✅ Email to customer
    const customerMail = {
      from: `"WheelSpa" <${process.env.ADMIN_EMAIL}>`,
      to: email,
      subject: '✅ Your WheelSpa Booking is Confirmed',
      html: `<h3>Hello ${name},</h3>
             <p>Thanks for booking <strong>${service}</strong> on <strong>${date}</strong> at <strong>${time}</strong>.</p>
             <p>We look forward to serving you at <strong>WheelSpa</strong> 🚗✨</p>`
    };

    await transporter.sendMail(customerMail);

    // ✅ Email to admin
    const adminMail = {
      from: `"WheelSpa" <${process.env.ADMIN_EMAIL}>`,
      to: process.env.ADMIN_EMAIL,
      subject: '📥 New Booking Received',
      html: `<h3>New Booking Received</h3>
             <ul>
               <li><strong>Name:</strong> ${name}</li>
               <li><strong>Phone:</strong> ${phone}</li>
               <li><strong>Email:</strong> ${email}</li>
               <li><strong>Service:</strong> ${service}</li>
               <li><strong>Date:</strong> ${date}</li>
               <li><strong>Time:</strong> ${time}</li>
             </ul>`
    };

    await transporter.sendMail(adminMail);

    return res.status(201).json({ message: 'Booking created and emails sent successfully' });

  } catch (error) {
    console.error('Booking error:', error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};


exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Booking deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



exports.getBookingsByContact = async (req, res) => {
  try {
    const value = req.params.value;
    const bookings = await Booking.find({
      $or: [{ phone: value }, { email: value }]
    }).sort({ createdAt: -1 });

    if (bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found' });
    }

    res.json(bookings);
  } catch (err) {
    console.error('Error fetching bookings by contact:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const bookings = await Booking.find({ email }).sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Fetch user bookings error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // ✅ Send email to user and admin
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASS,
      },
    });

    // Email to customer
    const userMail = {
      from: process.env.ADMIN_EMAIL,
      to: booking.email,
      subject: 'WheelSpa Booking Cancelled',
      html: `
        <h3>Hello ${booking.name},</h3>
        <p>Your booking for <strong>${booking.service}</strong> on <strong>${booking.date}</strong> at <strong>${booking.time}</strong> has been successfully cancelled.</p>
        <p>We're sorry to see you go. Hope to serve you again soon!</p>
      `,
    };

    // Email to admin
    const adminMail = {
      from: process.env.ADMIN_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: '🔔 Booking Cancelled',
      html: `
        <h4>Booking Cancelled</h4>
        <p><strong>${booking.name}</strong> cancelled their booking for <strong>${booking.service}</strong> on <strong>${booking.date}</strong> at <strong>${booking.time}</strong>.</p>
        <p>Phone: ${booking.phone} <br/> Email: ${booking.email}</p>
      `,
    };

    // Send both emails
    await transporter.sendMail(userMail);
    await transporter.sendMail(adminMail);

    res.status(200).json({ message: 'Booking cancelled and emails sent' });
  } catch (error) {
    console.error('Cancellation error:', error);
    res.status(500).json({ message: 'Error cancelling booking' });
  }
};