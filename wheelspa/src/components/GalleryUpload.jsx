import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import axios from 'axios';

const GalleryUpload = () => {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchImages = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/gallery');
      setGallery(res.data);
    } catch (err) {
      console.error('Failed to fetch images:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('image', image);
      formData.append('caption', caption);
      await axios.post('http://localhost:5000/api/gallery/upload', formData);
      setCaption('');
      setImage(null);
      setPreview(null);
      fetchImages();
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setUploading(false);
    }
  };

  const deleteImage = async (id) => {
    if (window.confirm('Delete this image?')) {
      try {
        await axios.delete(`http://localhost:5000/api/gallery/${id}`);
        fetchImages();
      } catch (err) {
        console.error('Delete failed:', err);
      }
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  return (
    <Container className="py-5">
      <h3 className="text-center mb-4">📤 Upload to Gallery</h3>

      <Form onSubmit={handleUpload}>
        <Row className="align-items-center g-3">
          <Col md={4}>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </Col>
          <Col md={4}>
            <Form.Control
              type="text"
              placeholder="Optional caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </Col>
          <Col md={4}>
            <Button type="submit" variant="danger" disabled={uploading}>
              {uploading ? 'Uploading...' : 'Upload'}
            </Button>
          </Col>
        </Row>
      </Form>

      {preview && (
        <div className="mt-4 text-center">
          <h6 className="mb-2">Preview:</h6>
          <img src={preview} alt="Preview" className="img-thumbnail" style={{ maxHeight: '250px' }} />
        </div>
      )}

      <hr className="my-5" />

      <h4 className="text-center mb-4">🖼 Gallery</h4>
      {loading ? (
        <div className="text-center py-4">
          <Spinner animation="border" variant="danger" />
        </div>
      ) : gallery.length === 0 ? (
        <p className="text-center text-muted">No images in the gallery yet.</p>
      ) : (
        <Row>
          {gallery.map((img) => (
            <Col key={img._id} md={4} className="mb-4">
              <Card className="shadow-sm">
                <Card.Img
                  variant="top"
                  src={`http://localhost:5000${img.imageUrl}`}
                  alt={img.caption}
                  style={{ height: '250px', objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Text>{img.caption || <em className="text-muted">No caption</em>}</Card.Text>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => deleteImage(img._id)}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default GalleryUpload;
