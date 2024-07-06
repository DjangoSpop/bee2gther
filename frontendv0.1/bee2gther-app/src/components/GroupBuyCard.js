import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button, ProgressBar, Badge } from 'react-bootstrap';
import { joinGroupBuy } from '../slices/groupBuySlice';
import { useNavigate } from 'react-router-dom';

const GroupBuyingCard = ({ groupBuy }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState('');
  const [progress, setProgress] = useState(0);
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(groupBuy.endDate).getTime() - now;
      
      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft('Expired');
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }

      const newProgress = (groupBuy.currentParticipants / groupBuy.targetParticipants) * 100;
      setProgress(newProgress);
    }, 1000);

    return () => clearInterval(timer);
  }, [groupBuy]);

  const handleJoinGroupBuy = () => {
    if (user) {
      dispatch(joinGroupBuy(groupBuy.id));
    } else {
      navigate('/login?redirect=group-buy');
    }
  };

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Img variant="top" src={groupBuy.product.image} />
      <Card.Body>
        <Card.Title>{groupBuy.product.name}</Card.Title>
        <Card.Text>{groupBuy.product.description}</Card.Text>
        <Badge variant="primary" className="mb-2">
          {groupBuy.currentParticipants} / {groupBuy.targetParticipants} participants
        </Badge>
        <ProgressBar now={progress} label={`${Math.round(progress)}%`} className="mb-3" />
        <Card.Text>
          <strong>Time Left:</strong> {timeLeft}
        </Card.Text>
        <Card.Text>
          <strong>Original Price:</strong> ${groupBuy.product.originalPrice}
        </Card.Text>
        <Card.Text>
          <strong>Group Buy Price:</strong> ${groupBuy.discountedPrice}
        </Card.Text>
        <Button 
          variant="success" 
          onClick={handleJoinGroupBuy}
          disabled={timeLeft === 'Expired' || progress === 100}
        >
          Join Group Buy
        </Button>
      </Card.Body>
    </Card>
  );
};

export default GroupBuyingCard;
