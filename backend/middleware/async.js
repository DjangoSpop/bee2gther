/**
 * Async handler to wrap async functions for Express route handlers
 * This eliminates the need for try-catch blocks in controller functions
 * @param {Function} fn - The async function to be wrapped
 * @returns {Function} - An Express middleware function
 */
const asyncHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);
  
  module.exports = asyncHandler;
