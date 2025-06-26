const express = require('express');
const router = express.Router();
const upload = require('../utils/upload');
const Gallery = require('../models/Gallery');

// Upload new image
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const newImage = new Gallery({
      imageUrl: `/uploads/${req.file.filename}`,
      caption: req.body.caption || ''
    });
    await newImage.save();
    res.status(201).json({ message: 'Image uploaded' });
  } catch (err) {
    res.status(500).json({ message: 'Upload failed' });
  }
});

// Get all images
router.get('/', async (req, res) => {
  const images = await Gallery.find().sort({ createdAt: -1 });
  res.json(images);
});

// Delete image
router.delete('/:id', async (req, res) => {
  await Gallery.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
