// Import contact model
Project = require('./projectModel');

// Handle index actions
exports.allProjects = function (req, res) {
    Project.get(function (err, projects) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Projects retrieved successfully",
            data: projects
        });
    });
    
};

exports.newProject = function (req, res) {
    var project = new Project();
    project.name = req.body.name ? req.body.name : project.name;
    project.teamMembers = req.body.teamMembers;
    project.teamId = req.body.teamId;


    // save the contact and check for errors
    project.save(function (err) {
        if (err)
            res.json(err);

        res.json({
            message: 'New project created!',
            data: project
        });
    });
};

exports.clearProjects = function (req, res) {
    var project = new Project();

    // save the contact and check for errors
    Project.remove({}, function (err) {
        if (err)
            res.json(err);

        res.json({
            message: 'projects cleared',
        });
    });
};
