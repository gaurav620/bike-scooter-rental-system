import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import API from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/users/login', { email, password });
      localStorage.setItem('token', data.token);
      window.location.href = '/dashboard';
    } catch (err) {
      alert('Error: ' + (err.response?.data?.msg || 'Login failed'));
    }
  };

  return (
    <Card className="mx-auto" style={{ maxWidth: '400px' }}>
      <Card.Body>
        <h2 className="text-center mb-4">Login</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" required />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">Login</Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Login;