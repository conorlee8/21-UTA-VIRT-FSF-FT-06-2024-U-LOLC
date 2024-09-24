const router = require('express').Router();
// Add your other API route imports here, such as:
// const bookRoutes = require('./bookRoutes'); // Example

// Use your other routes
// router.use('/books', bookRoutes); // Example usage

// If there are no specific API routes yet, remove or comment out the incorrect import
// const apiRoutes = require('./api'); // Remove this line

// Serve React frontend in production (if needed)
router.use((req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

module.exports = router;
