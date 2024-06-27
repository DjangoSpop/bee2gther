import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  background-color: #343a40;
  color: #fff;
  padding: 2rem 0;
`;

const Footer = () => {
  return (
    <StyledFooter>
      <Container>
        <Row>
          <Col className="text-center py-3">
            Copyright &copy; Buy2gether {new Date().getFullYear()}
          </Col>
        </Row>
      </Container>
    </StyledFooter>
  );
};

export default Footer;