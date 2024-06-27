// client/src/components/GroupBuyModal.js
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const GroupBuyModal = ({ show, onHide, onJoin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [address, setAddress] = useState('');
  const [shareLocation, setShareLocation] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onJoin();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Join Group Buy</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="mobileNumber">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Enter mobile number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="shareLocation">
            <Form.Check
              type="checkbox"
              label="Share location"
              checked={shareLocation}
              onChange={(e) => setShareLocation(e.target.checked)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" block>
            Join Group
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default GroupBuyModal;