const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.post('/contact', contactController.submitMessage);
router.get('/messages', contactController.getMessages);
router.delete('/messages/:id', contactController.deleteMessage);


module.exports = router;
