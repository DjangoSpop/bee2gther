const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Wishlist = require('../models/Wishlist');

// @desc    Add product to wishlist
// @route   POST /api/v1/wishlist
// @access  Private
exports.addToWishlist = asyncHandler(async (req, res, next) => {
  const { productId } = req.body;

  let wishlist = await Wishlist.findOne({ user: req.user.id });

  if (!wishlist) {
    wishlist = new Wishlist({ user: req.user.id, products: [productId] });
  } else {
    if (!wishlist.products.includes(productId)) {
      wishlist.products.push(productId);
    }
  }

  await wishlist.save();

  res.status(200).json({
    success: true,
    data: wishlist
  });
});

// @desc    Get user's wishlist
// @route   GET /api/v1/wishlist
// @access  Private
exports.getWishlist = asyncHandler(async (req, res, next) => {
  const wishlist = await Wishlist.findOne({ user: req.user.id }).populate('products');

  if (!wishlist) {
    return next(new ErrorResponse('Wishlist not found', 404));
  }

  res.status(200).json({
    success: true,
    data: wishlist
  });
});

// @desc    Remove product from wishlist
// @route   DELETE /api/v1/wishlist/:productId
// @access  Private
exports.removeFromWishlist = asyncHandler(async (req, res, next) => {
  const wishlist = await Wishlist.findOne({ user: req.user.id });

  if (!wishlist) {
    return next(new ErrorResponse('Wishlist not found', 404));
  }

  wishlist.products = wishlist.products.filter(
    product => product.toString() !== req.params.productId
  );

  await wishlist.save();

  res.status(200).json({
    success: true,
    data: wishlist
  });
});
