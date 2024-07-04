const Product = require('../models/Product');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('newProduct', async (productData) => {
      try {
        const product = await Product.create(productData);
        io.emit('productAdded', product);
      } catch (error) {
        console.error('Error creating product:', error);
      }
    });

    socket.on('updateProduct', async (productData) => {
      try {
        const product = await Product.findByIdAndUpdate(productData._id, productData, {
          new: true,
          runValidators: true
        });
        io.emit('productUpdated', product);
      } catch (error) {
        console.error('Error updating product:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};
