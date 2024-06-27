import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, ListGroup, Badge } from 'react-bootstrap';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import io from 'socket.io-client';

const StyledCard = styled(Card)`
  margin-top: 2rem;
`;

const AdminPanel = () => {
  const [serverStatus, setServerStatus] = useState('Offline');
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      const socket = io('http://localhost:5000');
      
      socket.on('connect', () => setServerStatus('Online'));
      socket.on('disconnect', () => setServerStatus('Offline'));
      socket.on('onlineUsers', (users) => setOnlineUsers(users));

      return () => socket.disconnect();
    }
  }, [userInfo]);

  if (!userInfo || !userInfo.isAdmin) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <StyledCard>
        <Card.Header as="h5">Admin Panel</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>
            Server Status: <Badge bg={serverStatus === 'Online' ? 'success' : 'danger'}>{serverStatus}</Badge>
          </ListGroup.Item>
          <ListGroup.Item>
            Online Users: {onlineUsers.length}
            <ListGroup>
              {onlineUsers.map((user) => (
                <ListGroup.Item key={user.id}>{user.name}</ListGroup.Item>
              ))}
            </ListGroup>
          </ListGroup.Item>
        </ListGroup>
      </StyledCard>
    </motion.div>
  );
};

export default AdminPanel;