import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import axios from 'axios';

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGallery = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/gallery');
      setGallery(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error loading gallery:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  return (
    <Container id="gallery" className="py-5">
      <h2 className="text-center mb-4">🚗 Our Work Gallery</h2>

      {loading ? (
        <div className="text-center"><Spinner animation="border" /></div>
      ) : (
        <Row>
          {gallery.map((img) => (
            <Col md={4} sm={6} xs={12} className="mb-4" key={img._id}>
              <Card className="shadow-sm">
                <div style={{ height: '250px', overflow: 'hidden' }}>
                  <Card.Img
                    variant="top"
                    src={`http://localhost:5000${img.imageUrl}`}
                    alt="Gallery item"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '5px'
                    }}
                  />
                </div>
                {img.caption && (
                  <Card.Body>
                    <Card.Text className="text-muted text-center">{img.caption}</Card.Text>
                  </Card.Body>
                )}
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Gallery;
