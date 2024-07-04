// src/screens/GroupBuyScreen.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { fetchGroupBuys, joinGroupBuy } from '../actions/groupBuyActions';

const GroupBuyScreen = () => {
  const dispatch = useDispatch();

  const groupBuyState = useSelector((state) => state.groupBuys);
  const { groupBuys, loading, error } = groupBuyState;

  const userState = useSelector((state) => state.user);
  const { userInfo } = userState || {};

  useEffect(() => {
    dispatch(fetchGroupBuys());
  }, [dispatch]);

  const joinHandler = (id) => {
    if (userInfo) {
      dispatch(joinGroupBuy({ groupBuyId: id, userId: userInfo._id }));
    } else {
      alert('Please login to join a group buy');
    }
  };

  return (
    <>
      <h1>Active Group Buys</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {groupBuys.map((groupBuy) => (
            <Col key={groupBuy._id} sm={12} md={6} lg={4} xl={3}>
              <Card className="my-3 p-3 rounded">
                <Link to={`/product/${groupBuy.product._id}`}>
                  <Card.Img src={groupBuy.product.image} variant="top" />
                </Link>
                <Card.Body>
                  <Link to={`/product/${groupBuy.product._id}`}>
                    <Card.Title as="div">
                      <strong>{groupBuy.product.name}</strong>
                    </Card.Title>
                  </Link>
                  <Card.Text as="div">
                    Discount: {groupBuy.discountPercentage}%
                  </Card.Text>
                  <Card.Text as="div">
                    Participants: {groupBuy.currentParticipants}/{groupBuy.requiredParticipants}
                  </Card.Text>
                  <Button
                    onClick={() => joinHandler(groupBuy._id)}
                    className="btn-block"
                    type="button"
                    disabled={groupBuy.currentParticipants >= groupBuy.requiredParticipants}
                  >
                    {groupBuy.currentParticipants >= groupBuy.requiredParticipants ? 'Group Buy Full' : 'Join Group Buy'}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default GroupBuyScreen;
