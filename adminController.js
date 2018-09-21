// Import contact model
Project = require('./projectModel');


exports.getResults = function (req, res) {
    var query = Project.find({}).select('name').select('votes');
    query.exec(function (err, projects) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "voting results retrieved successfully",
            data: projects
        });
    });
};


exports.getProjectsForExpo = function(req, res) {
    console.log(req.headers.expo)
    var query = Project.find({"expo":req.headers.expo});
    query.exec(function (err, projects) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "projects for expo retrieved successfully",
            data: projects
        });
    });
};