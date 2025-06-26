import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import AdminLogin from './components/AdminLogin';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './components/AdminDashboard';
import GalleryUpload from './components/GalleryUpload';
import AdminContactMessages from './components/AdminContactMessages';
import MyBookings from './components/MyBookings';
import BookingForm from './components/BookingForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<App />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/booking" element={<BookingForm />} />
        <Route path="/my-bookings" element={<MyBookings />} />

        {/* Admin routes (wrapped in layout) */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="gallery-upload" element={<GalleryUpload />} />
          <Route path="messages" element={<AdminContactMessages />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
