const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const bookingRoutes = require('./routes/bookingRoutes');
const contactRoutes = require('./routes/contactRoutes')
const adminAuthRoutes = require('./routes/adminAuthRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminAuthRoutes);
app.use('/api/gallery', require('./routes/galleryRoutes'));
app.use('/uploads', express.static('uploads'));
app.use('/api/bookings', bookingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
