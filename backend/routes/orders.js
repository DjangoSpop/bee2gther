const express = require('express');
const {
  getOrders,
  getOrder,
  addOrder,
  updateOrder,
  deleteOrder
} = require('../controllers/orderController');

const Order = require('../models/Order');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router
  .route('/')
  .get(authorize('admin'), advancedResults(Order), getOrders)
  .post(addOrder);

router
  .route('/:id')
  .get(getOrder)
  .put(authorize('admin'), updateOrder)
  .delete(authorize('admin'), deleteOrder);

module.exports = router;
