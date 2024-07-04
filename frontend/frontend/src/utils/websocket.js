import io from 'socket.io-client';
import { showNotification } from '../slices/notificationSlice';

let socket;

export const initializeSocket = (dispatch) => {
  socket = io('http://localhost:5000');

  socket.on('groupBuyCompleted', (data) => {
    dispatch(showNotification({
      message: `Group buy for ${data.productName} completed!`,
      type: 'success'
    }));
    
    // If the current user is a seller, show more details
    // if (data.sellerId === currentUserId) {
    //   console.log('Group Buy Details:', data.users, data.addresses);
    //   // Here you could open a modal or navigate to a details page
    // }
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) socket.disconnect();
};
