import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [city, setCity] = useState('India');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await API.get('/vehicles', {
        params: {
          location: city,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        }
      });
      // Navigate to vehicles with results (pass data via state or context)
      navigate('/vehicles', { state: { vehicles: response.data } });
    } catch (err) {
      alert('Error searching');
    }
  };

  return (
    <Container className="search-bar">
      <Form onSubmit={handleSearch} className="d-flex">
        <Form.Control type="text" placeholder="Current City" value={city} onChange={(e) => setCity(e.target.value)} />
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} showTimeSelect dateFormat="Pp" />
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} showTimeSelect dateFormat="Pp" />
        <Button variant="danger" type="submit">Rent now</Button>
      </Form>
    </Container>
  );
};

export default SearchBar;