import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { fetchGroupBuys } from '../slices/groupBuySlice';
import GroupBuyingCard from './GroupBuyingCard';
import Loader from './Loader';
import Message from './Message';

const GroupBuyingList = () => {
  const dispatch = useDispatch();
  const { groupBuys, loading, error } = useSelector(state => state.groupBuy);

  useEffect(() => {
    dispatch(fetchGroupBuys());
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <Message variant="danger">{error}</Message>;

  return (
    <Row>
      {groupBuys.map(groupBuy => (
        <Col key={groupBuy.id} sm={12} md={6} lg={4} xl={3}>
          <GroupBuyingCard groupBuy={groupBuy} />
        </Col>
      ))}
    </Row>
  );
};

export default GroupBuyingList;
