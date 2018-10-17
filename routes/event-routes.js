// Initialize express router
let router = require('express').Router();

// Set default API response
// router.get('/', function (req, res) {
//     res.json({
//         status: 'event Its Working',
//         message: 'Welcome to RESTHub crafted with love!',
//     });
// });

var eventController = require('../controllers/eventController');

router.route('/')
    .get(eventController.getAllEvents)
    .post(eventController.createNewEvent)
    .delete(eventController.clearEvents)

router.route('/team')
    .post(eventController.insertTeam)
// Export API routes
module.exports = router;