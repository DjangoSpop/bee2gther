import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addToCart, getCartItems, removeFromCart } from '../actions/cartsActions';
import Message from '../components/Message';
import { Button, ListGroup, Row, Col, Image, Form } from 'react-bootstrap';

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const cart = useSelector((state) => state.cart);
  const { cartItems, loading, error } = cart;

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, 1));
    }
    dispatch(getCartItems());
  }, [dispatch, id]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=shipping');
  };

  const updateQuantityHandler = (id, quantity) => {
    dispatch(addToCart(id, Number(quantity)));
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Button variant="light" onClick={() => navigate('/')}>Go Back</Button>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Button variant="link" onClick={() => navigate(`/product/${item.product}`)}>
                      {item.name}
                    </Button>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) => updateQuantityHandler(item.product, e.target.value)}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
            ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
          </ListGroup.Item>
          <ListGroup.Item>
            <Button
              type="button"
              className="btn-block"
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
            >
              Proceed To Checkout
            </Button>
          </ListGroup.Item>
        </ListGroup>
      </Col>
    </Row>
  );
};

export default CartScreen;
