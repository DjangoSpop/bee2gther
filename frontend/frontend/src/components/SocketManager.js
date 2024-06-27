import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeSocket, disconnectSocket } from '../utils/websocket';

const SocketManager = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (userInfo) {
      initializeSocket(dispatch, userInfo._id)
        .catch(error => {
          console.error('WebSocket initialization error:', error);
          // Handle the error (e.g., dispatch an action to show an error message)
        });
    }

    return () => {
      disconnectSocket();
    };
  }, [dispatch, userInfo]);

  return null; // This component doesn't render anything
};

export default SocketManager;
