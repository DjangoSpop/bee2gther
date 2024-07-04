
const express = require('express');
const dotenv = require('dotenv');
require('dotenv').config();
const morgan = require('morgan');
const colors = require('colors');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');
const socketIo = require('socket.io');
const auth = require('./routes/auth');
const users = require('./routes/users');
const products = require('./routes/products');
const orders = require('./routes/orders');
const groupBuys = require('./routes/groupbuys');
const wishlist = require('./routes/wishlist');
const io = socketIo(server); 
// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// Route files


io.on('connection', (socket) => { // io is now used here
  console.log('A user connected');

  // ... (now you can use the 'io' object to emit events to all connected clients or to specific ones)
  socket.emit('welcome', 'Welcome to the chat!');
});

const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/products', products);
app.use('/api/v1/orders', orders);
app.use('/api/v1/groupbuys', groupBuys);
app.use('/api/v1/wishlist', wishlist);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});