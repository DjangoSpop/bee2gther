const express = require('express');
const {
  getGroupBuys,
  getGroupBuy,
  createGroupBuy,
  updateGroupBuy,
  deleteGroupBuy,
  joinGroupBuy
} = require('../controllers/groupBuyController');

const GroupBuy = require('../models/GroupBuy');

const router = express.Router();

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(advancedResults(GroupBuy), getGroupBuys)
  .post(protect, authorize('user', 'admin'), createGroupBuy);

router
  .route('/:id')
  .get(getGroupBuy)
  .put(protect, authorize('user', 'admin'), updateGroupBuy)
  .delete(protect, authorize('user', 'admin'), deleteGroupBuy);

router
  .route('/:id/join')
  .put(protect, joinGroupBuy);

module.exports = router;
