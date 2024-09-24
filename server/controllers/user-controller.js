const router = require('express').Router();
const {
  createUser,
  getSingleUser,
  saveBook,
  deleteBook,
  login,
} = require('../../controllers/user-controller');

// Import middleware for verifying the token
const { authMiddleware } = require('../../utils/auth');

// Routes for creating user and saving a book
router.route('/').post(createUser).put(authMiddleware, saveBook);

// Login route
router.route('/login').post(login);

// Get a single user with auth middleware
router.route('/me').get(authMiddleware, getSingleUser);

// Delete a book with auth middleware
router.route('/books/:bookId').delete(authMiddleware, deleteBook);

module.exports = router;
