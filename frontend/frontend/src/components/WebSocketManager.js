import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeSocket, disconnectSocket } from '../utils/websocket';

const WebSocketManager = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (userInfo) {
      initializeSocket(dispatch, () => userInfo._id);
    }

    return () => {
      disconnectSocket();
    };
  }, [dispatch, userInfo]);

  return null; // This component doesn't render anything
};

export default WebSocketManager;
