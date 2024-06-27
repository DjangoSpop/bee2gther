import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Toast } from 'react-bootstrap';
import { clearNotification } from '../slices/notificationSlice.js';

const Notifications = () => {
  const dispatch = useDispatch();
  const { notifications } = useSelector(state => state.notification);

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      style={{
        position: 'fixed',
        top: 20,
        right: 20,
        minHeight: '200px',
        zIndex: 9999
      }}
    >
      {notifications.map((notification, index) => (
        <Toast 
          key={index}
          onClose={() => dispatch(clearNotification(notification.id))}
          show={true}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="mr-auto">{notification.title}</strong>
          </Toast.Header>
          <Toast.Body>{notification.message}</Toast.Body>
        </Toast>
      ))}
    </div>
  );
};

export default Notifications; 