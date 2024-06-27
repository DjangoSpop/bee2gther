import React from 'react';
import { Card, Button, ProgressBar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { joinGroupBuy } from '../slices/groupBuySlice';

const StyledCard = styled(motion.div)`
  margin-bottom: 20px;
`;

const StyledProgressBar = styled(ProgressBar)`
  height: 10px;
  margin-top: 10px;
`;

const GroupBuyCard = ({ groupBuy }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  const progress = (groupBuy.currentParticipants / groupBuy.requiredParticipants) * 100;

  const handleJoin = () => {
    if (userInfo) {
      dispatch(joinGroupBuy({ groupBuyId: groupBuy._id, userId: userInfo._id }));
    } else {
      // Redirect to login or show login modal
    }
  };

  return (
    <StyledCard
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Card>
        <Card.Body>
          <Card.Title>{groupBuy.product.name}</Card.Title>
          <Card.Text>
            Price: ${groupBuy.discountedPrice} (Save {groupBuy.discountPercentage}%)
          </Card.Text>
          <Card.Text>
            Participants: {groupBuy.currentParticipants} / {groupBuy.requiredParticipants}
          </Card.Text>
          <StyledProgressBar now={progress} label={`${Math.round(progress)}%`} />
          <Button 
            onClick={handleJoin} 
            disabled={groupBuy.currentParticipants >= groupBuy.requiredParticipants}
            className="mt-3"
          >
            {groupBuy.currentParticipants >= groupBuy.requiredParticipants ? 'Group Buy Full' : 'Join Group Buy'}
          </Button>
        </Card.Body>
      </Card>
    </StyledCard>
  );
};

export default GroupBuyCard;