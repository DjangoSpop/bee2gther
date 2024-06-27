import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaInfoCircle } from 'react-icons/fa';
import { registerUser } from '../slices/userSlice';
import Message from '../components/Message';
import Loader from '../components/Loader';

const StyledForm = styled(Form)`
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StyledInput = styled(Form.Control)`
  border-radius: 20px;
  padding: 0.5rem 1rem;
`;

const StyledSelect = styled(Form.Select)`
  border-radius: 20px;
  padding: 0.5rem 1rem;
`;

const StyledButton = styled(Button)`
  border-radius: 20px;
  padding: 0.5rem 2rem;
`;

const PasswordHint = styled.div`
  font-size: 0.8rem;
  color: #6c757d;
  margin-top: 0.25rem;
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 0.8rem;
  margin-top: 0.25rem;
`;

const Tooltip = styled.div`
  position: relative;
  display: inline-block;
  
  &:hover span {
    visibility: visible;
    opacity: 1;
  }
`;

const TooltipText = styled.span`
  visibility: hidden;
  width: 200px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -100px;
  opacity: 0;
  transition: opacity 0.3s;
  
  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
  }
`;

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    )
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  userType: yup.string().required('User Type is required'),
});

const RegisterScreen = () => {
  const [passwordFocus, setPasswordFocus] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, userInfo } = useSelector((state) => state.user);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };

  if (userInfo) {
    navigate('/');
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h1 className="text-center mb-4">Sign Up</h1>
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="name" className="mb-3">
              <Form.Label>Name</Form.Label>
              <StyledInput
                type="text"
                placeholder="Enter name"
                {...register('name')}
                isInvalid={!!errors.name}
              />
              <ErrorMessage>{errors.name?.message}</ErrorMessage>
            </Form.Group>

            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <StyledInput
                type="email"
                placeholder="Enter email"
                {...register('email')}
                isInvalid={!!errors.email}
              />
              <ErrorMessage>{errors.email?.message}</ErrorMessage>
            </Form.Group>

            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <StyledInput
                type="password"
                placeholder="Enter password"
                {...register('password')}
                isInvalid={!!errors.password}
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
              />
              <ErrorMessage>{errors.password?.message}</ErrorMessage>
              {passwordFocus && (
                <PasswordHint>
                  Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.
                </PasswordHint>
              )}
            </Form.Group>

            <Form.Group controlId="confirmPassword" className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <StyledInput
                type="password"
                placeholder="Confirm password"
                {...register('confirmPassword')}
                isInvalid={!!errors.confirmPassword}
              />
              <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>
            </Form.Group>

            <Form.Group controlId="userType" className="mb-3">
              <Form.Label>
                User Type{' '}
                <Tooltip>
                  <FaInfoCircle />
                  <TooltipText>
                    Buyer: Purchase products in groups
                    Seller: List and sell products
                    Admin: Manage the platform
                  </TooltipText>
                </Tooltip>
              </Form.Label>
              <StyledSelect {...register('userType')} isInvalid={!!errors.userType}>
                <option value="">Select user type</option>
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
                <option value="admin">Admin</option>
              </StyledSelect>
              <ErrorMessage>{errors.userType?.message}</ErrorMessage>
            </Form.Group>

            <StyledButton type="submit" variant="primary" className="w-100 mt-3">
              Register
            </StyledButton>
          </StyledForm>

          <Row className="py-3">
            <Col>
              Already have an account?{' '}
              <Link to="/login">Login</Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </motion.div>
  );
};

export default RegisterScreen;