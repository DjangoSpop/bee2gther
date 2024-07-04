// src/screens/ProductScreen.js
import React, { useEffect, useState, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card, Button, Form, ProgressBar } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { fetchProductDetails } from '../actions/productActions';
import { addToCart } from '../actions/cartActions';
import { createGroupBuy, joinGroupBuy, fetchGroupBuys } from '../actions/groupBuyActions';
import { showNotification } from '../actions/notificationActions';

const StyledButton = styled(Button)`
  margin-right: 10px;
`;

const PriceTag = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${(props) => (props.discounted ? '#28a745' : '#000')};
`;

const DiscountBadge = styled.span`
  background-color: #28a745;
  color: white;
  padding: 2px 5px;
  border-radius: 3px;
  font-size: 0.8rem;
  margin-left: 10px;
`;

const GroupBuyCard = styled(Card)`
  margin-bottom: 15px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const { id } = useParams();
  const dispatch = useDispatch();

  const productState = useSelector((state) => state.products);
  const { loading, error, product } = productState || {};

  const groupBuyState = useSelector((state) => state.groupBuys);
  const { groupBuys, loading: groupBuyLoading } = groupBuyState || {};

  const userState = useSelector((state) => state.user);
  const { userInfo } = userState || {};

  useEffect(() => {
    dispatch(fetchProductDetails(id));
    dispatch(fetchGroupBuys());
  }, [dispatch, id]);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    dispatch(showNotification({ message: 'Product added to cart', type: 'success' }));
  };

  const createGroupBuyHandler = () => {
    if (!userInfo) {
      dispatch(showNotification({ message: 'Please log in to start a group buy', type: 'info' }));
      return;
    }
    dispatch(
      createGroupBuy({
        productId: product._id,
        requiredParticipants: 5,
        discountPercentage: 20,
      })
    );
  };

  const joinGroupBuyHandler = useCallback(
    (groupBuyId) => {
      if (!userInfo) {
        dispatch(showNotification({ message: 'Please log in to join a group buy', type: 'info' }));
        return;
      }
      dispatch(joinGroupBuy({ groupBuyId, userId: userInfo._id }))
        .then(() => {
          dispatch(showNotification({ message: 'Successfully joined group buy', type: 'success' }));
        })
        .catch((error) => {
          dispatch(showNotification({ message: error.message, type: 'error' }));
        });
    },
    [dispatch, userInfo]
  );

  const calculateDiscountedPrice = (price, discount) => {
    return (price * (100 - discount) / 100).toFixed(2);
  };

  if (loading || groupBuyLoading) return <Loader />;
  if (error) return <Message variant="danger">{error}</Message>;
  if (!product) return null;

  const activeGroupBuys = groupBuys.filter(
    (gb) => gb.product._id === product._id && gb.currentParticipants < gb.requiredParticipants
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating value={product.rating} text={`${product.numReviews} reviews`} />
            </ListGroup.Item>
            <ListGroup.Item>
              <PriceTag>Price: ${product.price}</PriceTag>
            </ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</Col>
                </Row>
              </ListGroup.Item>
              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <StyledButton
                  onClick={addToCartHandler}
                  className="btn-block"
                  type="button"
                  disabled={product.countInStock === 0}
                >
                  Add To Cart
                </StyledButton>
                <StyledButton
                  onClick={createGroupBuyHandler}
                  className="btn-block"
                  type="button"
                  variant="success"
                >
                  Start Group Buy
                </StyledButton>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h2>Active Group Buys</h2>
          <AnimatePresence>
            {activeGroupBuys.map((groupBuy) => (
              <motion.div
                key={groupBuy._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
              >
                <GroupBuyCard>
                  <Card.Body>
                    <Card.Title>Group Buy Opportunity</Card.Title>
                    <Card.Text>
                      <PriceTag discounted>
                        ${calculateDiscountedPrice(product.price, groupBuy.discountPercentage)}
                      </PriceTag>
                      <DiscountBadge>{groupBuy.discountPercentage}% OFF</DiscountBadge>
                    </Card.Text>
                    <Card.Text>
                      Participants: {groupBuy.currentParticipants} / {groupBuy.requiredParticipants}
                    </Card.Text>
                    <ProgressBar
                      now={(groupBuy.currentParticipants / groupBuy.requiredParticipants) * 100}
                      label={`${Math.round((groupBuy.currentParticipants / groupBuy.requiredParticipants) * 100)}%`}
                    />
                    <Button
                      onClick={() => joinGroupBuyHandler(groupBuy._id)}
                      disabled={groupBuy.currentParticipants >= groupBuy.requiredParticipants}
                      className="mt-3"
                      variant="outline-success"
                    >
                      {groupBuy.currentParticipants >= groupBuy.requiredParticipants ? 'Group Buy Full' : 'Join Group Buy'}
                    </Button>
                  </Card.Body>
                </GroupBuyCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </Col>
      </Row>
    </motion.div>
  );
};

export default ProductScreen;
