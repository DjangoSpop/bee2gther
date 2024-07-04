import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';
import { fetchProducts } from '../slices/productSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductListing = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <Message variant="danger">{error}</Message>;

  return (
    <Row>
      {products.map((product) => (
        <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
          <Card className="my-3 p-3 rounded">
            <Link to={`/product/${product.id}`}>
              <Card.Img src={product.image} variant="top" />
            </Link>
            <Card.Body>
              <Link to={`/product/${product.id}`}>
                <Card.Title as="div">
                  <strong>{product.name}</strong>
                </Card.Title>
              </Link>
              <Card.Text as="h3">${product.price}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ProductListing;