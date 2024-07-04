const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.user.id).select('-password');

      if (!req.user) {
        return res.status(404).json({ msg: 'User not found' });
      }

      next();
    } catch (err) {
      console.error('Token verification failed:', err);
      res.status(401).json({ msg: 'Not authorized' });
    }
  } else {
    res.status(401).json({ msg: 'No token, authorization denied' });
  }
};


// const jwt = require('jsonwebtoken');
// const asyncHandler = require('./async');
// const ErrorResponse = require('../utils/errorResponse');
// const User = require('../models/User');

// // Protect routes
// exports.protect = asyncHandler(async (req, res, next) => {
//   let token;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith('Bearer')
//   ) {
//     // Set token from Bearer token in header
//     token = req.headers.authorization.split(' ')[1];
//   }
//   // Set token from cookie
//   // else if (req.cookies.token) {
//   //   token = req.cookies.token;
//   // }

//   // Make sure token exists
//   if (!token) {
//     return next(new ErrorResponse('Not authorized to access this route', 401));
//   }

//   try {
//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.user = await User.findById(decoded.id);

//     next();
//   } catch (err) {
//     return next(new ErrorResponse('Not authorized to access this route', 401));
//   }
// });

// // Grant access to specific roles
// exports.authorize = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return next(
//         new ErrorResponse(
//           `User role ${req.user.role} is not authorized to access this route`,
//           403
//         )
//       );
//     }
//     next();
//   };
// };
