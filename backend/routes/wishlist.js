const express = require('express');
const {
  addToWishlist,
  getWishlist,
  removeFromWishlist
} = require('../controllers/wishlistController');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.use(protect);

router
  .route('/')
  .get(getWishlist)
  .post(addToWishlist);

router
  .route('/:productId')
  .delete(removeFromWishlist);

module.exports = router;
