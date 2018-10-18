// Initialize express router
let router = require('express').Router();

// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});

// Import contact controller
var projectController = require('../projectController');
var adminController = require('../adminController');
var expositionController = require('../expositionController');

//GET projects with no parameters
//POST new project with [name], [teamId], [teamMembers]
//DELETE all project with no parameters
router.route('/projects')
    .get(projectController.allProjects)
    .post(projectController.newProject)
    .delete(projectController.clearProjects);

router.route('/projects/expo')
    .get(adminController.getProjectsForExpo);



//VOTE FOR A PROJECT
//post the [teamId] and it will auto increment votes
router.route('/projects/vote').post(projectController.voteForProject);


//VOTE FOR A PROJECT
//post the [teamId] and [comment] in body
router.route('/projects/comment').post(projectController.commentForProject);




//GET VOTING RESULTS
router.route('/voting/results').get(adminController.getResults);


//EXPOSITION ROUTES
router.route('/expositions').get(expositionController.getExpositions);
router.route('/expositions').post(expositionController.newExposition);
router.route('/expositions').delete(expositionController.clearExpositions);
router.route('/expositions/expo').get(expositionController.getExpo);

// Export API routes
module.exports = router;