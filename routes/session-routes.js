// Initialize express router
let router = require('express').Router();

// Set default API response
// router.get('/', function (req, res) {
//     res.json({
//         status: 'event Its Working',
//         message: 'Welcome to RESTHub crafted with love!',
//     });
// });

var sessionController = require('../controllers/sessionController');

router.route('/')
    .get(sessionController.getAllSessions)


// Export API routes
module.exports = router;