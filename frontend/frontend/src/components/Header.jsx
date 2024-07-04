import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import styled from 'styled-components';
import { logout } from '../slices/userSlice';

// Conditionally import LinkContainer and motion
let LinkContainer;
let motion;
try {
  ({ LinkContainer } = require('react-router-bootstrap'));
  ({ motion } = require('framer-motion'));
} catch (error) {
  console.warn('react-router-bootstrap or framer-motion not available. Some features may be limited.');
}

const StyledNavbar = styled(Navbar)`
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
`;

const IconWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const CartBadge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #dc3545;
  color: white;
  border-radius: 50%;
  padding: 0.25em 0.6em;
  font-size: 0.75rem;
`;

const Header = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  const logoutHandler = () => {
    dispatch(logout());
  };

  const LogoComponent = motion ? motion(Logo) : Logo;

  return (
    <header>
      <StyledNavbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          {LinkContainer ? (
            <LinkContainer to="/">
              <Navbar.Brand>
                <LogoComponent
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  BEE2GTHER
                </LogoComponent>
              </Navbar.Brand>
            </LinkContainer>
          ) : (
            <Link to="/">
              <Navbar.Brand>
                <LogoComponent>BEE2GTHER</LogoComponent>
              </Navbar.Brand>
            </Link>
          )}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {LinkContainer ? (
                <LinkContainer to="/cart">
                  <Nav.Link>
                    <IconWrapper>
                      <FaShoppingCart /> Cart
                      {cartItems.length > 0 && <CartBadge>{cartItems.length}</CartBadge>}
                    </IconWrapper>
                  </Nav.Link>
                </LinkContainer>
              ) : (
                <Link to="/cart">
                  <Nav.Link>
                    <IconWrapper>
                      <FaShoppingCart /> Cart
                      {cartItems.length > 0 && <CartBadge>{cartItems.length}</CartBadge>}
                    </IconWrapper>
                  </Nav.Link>
                </Link>
              )}
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  {LinkContainer ? (
                    <>
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/orders">
                        <NavDropdown.Item>Orders</NavDropdown.Item>
                      </LinkContainer>
                    </>
                  ) : (
                    <>
                      <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/orders">Orders</NavDropdown.Item>
                    </>
                  )}
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : LinkContainer ? (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <FaUser /> Sign In
                  </Nav.Link>
                </LinkContainer>
              ) : (
                <Link to="/login">
                  <Nav.Link>
                    <FaUser /> Sign In
                  </Nav.Link>
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </StyledNavbar>
    </header>
  );
};

export default Header;
