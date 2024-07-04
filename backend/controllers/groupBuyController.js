const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const GroupBuy = require('../models/GroupBuy');

// @desc    Get all group buys
// @route   GET /api/v1/groupbuys
// @access  Public
exports.getGroupBuys = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get single group buy
// @route   GET /api/v1/groupbuys/:id
// @access  Public
exports.getGroupBuy = asyncHandler(async (req, res, next) => {
  const groupBuy = await GroupBuy.findById(req.params.id).populate('product').populate('participants');

  if (!groupBuy) {
    return next(new ErrorResponse(`Group buy not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({ success: true, data: groupBuy });
});

// @desc    Create new group buy
// @route   POST /api/v1/groupbuys
// @access  Private
exports.createGroupBuy = asyncHandler(async (req, res, next) => {
  req.body.creator = req.user.id;

  const groupBuy = await GroupBuy.create(req.body);

  res.status(201).json({
    success: true,
    data: groupBuy
  });
});

// @desc    Update group buy
// @route   PUT /api/v1/groupbuys/:id
// @access  Private
exports.updateGroupBuy = asyncHandler(async (req, res, next) => {
  let groupBuy = await GroupBuy.findById(req.params.id);

  if (!groupBuy) {
    return next(new ErrorResponse(`Group buy not found with id of ${req.params.id}`, 404));
  }

  // Make sure user is group buy creator
  if (groupBuy.creator.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to update this group buy`, 401));
  }

  groupBuy = await GroupBuy.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({ success: true, data: groupBuy });
});

// @desc    Delete group buy
// @route   DELETE /api/v1/groupbuys/:id
// @access  Private
exports.deleteGroupBuy = asyncHandler(async (req, res, next) => {
  const groupBuy = await GroupBuy.findById(req.params.id);

  if (!groupBuy) {
    return next(new ErrorResponse(`Group buy not found with id of ${req.params.id}`, 404));
  }

  // Make sure user is group buy creator
  if (groupBuy.creator.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to delete this group buy`, 401));
  }

  await groupBuy.remove();

  res.status(200).json({ success: true, data: {} });
});

// @desc    Join group buy
// @route   PUT /api/v1/groupbuys/:id/join
// @access  Private
exports.joinGroupBuy = asyncHandler(async (req, res, next) => {
  const groupBuy = await GroupBuy.findById(req.params.id);

  if (!groupBuy) {
    return next(new ErrorResponse(`Group buy not found with id of ${req.params.id}`, 404));
  }

  if (groupBuy.participants.includes(req.user.id)) {
    return next(new ErrorResponse(`User already joined this group buy`, 400));
  }

  groupBuy.participants.push(req.user.id);
  await groupBuy.save();

  res.status(200).json({ success: true, data: groupBuy });
});
