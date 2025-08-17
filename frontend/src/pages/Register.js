import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import API from '../services/api';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    try {
      const { data } = await API.post('/users/register', { name, email, password });
      localStorage.setItem('token', data.token); // Store token on successful registration
      window.location.href = '/dashboard'; // Redirect to dashboard
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <Card className="mx-auto" style={{ maxWidth: '400px' }}>
      <Card.Body>
        <h2 className="text-center mb-4">Register</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Register
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Register;