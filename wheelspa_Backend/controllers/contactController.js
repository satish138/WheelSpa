const ContactMessage = require('../models/ContactMessage');

exports.submitMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newMessage = new ContactMessage({ name, email, message });
    await newMessage.save();

    return res.status(201).json({ message: 'Message sent successfully' });
  } catch (err) {
    console.error('Contact message error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};


exports.getMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Server error while fetching messages' });
  }
};
exports.deleteMessage = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete message' });
  }
};
