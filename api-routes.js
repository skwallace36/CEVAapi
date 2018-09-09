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
var projectController = require('./projectController');


//GET projects
//POST new project with name, teamId, teamMembers
//DELETE all project
router.route('/projects')
    .get(projectController.allProjects)
    .post(projectController.newProject)
    .delete(projectController.clearProjects);

//VOTE FOR A PROJECT
//post the teamId and it will auto increment votes
router.route('/projects/vote').post(projectController.voteForProject);

//VOTE FOR A PROJECT
//post the teamId and comment in body
router.route('/projects/comment').post(projectController.commentForProject);




// Export API routes
module.exports = router;