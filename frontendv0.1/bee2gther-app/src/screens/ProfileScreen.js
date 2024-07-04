// src/screens/ProfileScreen.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { getUserProfile, updateUserProfile } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProfileScreen = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [isSeller, setIsSeller] = useState(false);

  const dispatch = useDispatch();

  const userState = useSelector((state) => state.user);
  const { user, loading, error, success } = userState;

  useEffect(() => {
    if (!user) {
      dispatch(getUserProfile());
    } else {
      setEmail(user.email);
      setRole(user.role);
      setIsSeller(user.is_seller);
    }
  }, [dispatch, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile({ email, role, is_seller: isSeller }));
  };

  return (
    <Row>
      <Col md={6} className="mx-auto">
        <h1>User Profile</h1>
        {error && <Message variant="danger">{error}</Message>}
        {success && <Message variant="success">Profile Updated</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="role">
            <Form.Label>Role</Form.Label>
            <Form.Control
              as="select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="customer">Customer</option>
              <option value="seller">Seller</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="isSeller" className="mt-3">
            <Form.Check
              type="checkbox"
              label="Register as Seller"
              checked={isSeller}
              onChange={(e) => setIsSeller(e.target.checked)}
            />
          </Form.Group>
          <Button type="submit" variant="primary" className="mt-3">
            Update Profile
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
