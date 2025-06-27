import React, { useEffect, useState } from 'react';
import { Container, Table, Spinner, Alert, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const AdminContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/contact/messages');
      setMessages(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error('Error fetching messages:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/contact/messages/${id}`);
      const updated = messages.filter(msg => msg._id !== id);
      setMessages(updated);
      setFiltered(updated);
    } catch (err) {
      alert('Failed to delete message');
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    const filteredData = messages.filter(
      (msg) =>
        msg.name.toLowerCase().includes(search.toLowerCase()) ||
        msg.email.toLowerCase().includes(search.toLowerCase()) ||
        msg.message.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(filteredData);
  }, [search, messages]);

  return (
    <Container className="py-5">
      <h2 className="mb-4 text-center">📩 Contact Messages</h2>

      <Form.Control
        type="text"
        placeholder="Search messages..."
        className="mb-3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <div className="text-center"><Spinner animation="border" /></div>
      ) : filtered.length === 0 ? (
        <Alert variant="info">No messages found.</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Received At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((msg) => (
              <tr key={msg._id}>
                <td>{msg.name}</td>
                <td>{msg.email}</td>
                <td>{msg.message}</td>
                <td>{new Date(msg.createdAt).toLocaleString()}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deleteMessage(msg._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default AdminContactMessages;
