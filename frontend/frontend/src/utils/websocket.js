import io from 'socket.io-client';
import { showNotification } from '../slices/notificationSlice';

let socket;

export const initializeSocket = (dispatch, currentUserId) => {
  socket = io('http://localhost:5000');

  socket.on('groupBuyCompleted', (data) => {
    dispatch(showNotification({
      message: `Group buy for ${data.productName} completed!`,
      type: 'success'
    }));
    
    // If the current user is a seller, show more details
    if (data.sellerId === currentUserId) {
      dispatch(showNotification({
        message: 'A group buy youre selling has been completed. Check your dashboard for details.',
        type: 'info'
      }));
      // Here you could dispatch an action to update the seller's dashboard
      // or open a modal with the group buy details
    }
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) socket.disconnect();
};

export const emitJoinGroupBuy = (groupBuyId, userId) => {
  if (socket) {
    socket.emit('joinGroupBuy', { groupBuyId, userId });
  }
};

export const emitLeaveGroupBuy = (groupBuyId, userId) => {
  if (socket) {
    socket.emit('leaveGroupBuy', { groupBuyId, userId });
  }
};
