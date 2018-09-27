// Import contact model
Expo = require('./expositionModel');


exports.getExpositions = function (req, res) {
    var query = Expo.find({});
    query.exec(function (err, projects) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "expositions retrieved successfully",
            data: projects
        });
    });
};

exports.newExposition = function (req, res) {
    var expo = new Expo();
    expo.name = req.body.name ? req.body.name : expo.name;
    expo.location = req.body.location ? req.body.location : expo.location;
    expo.numProjects = 0;
    expo.description = req.body.description ? req.body.description : expo.description;
    // save the contact and check for errors
    expo.save(function (err) {
        if (err)
            res.json(err);

        res.json({
            message: 'New expo created!',
            data: expo
        });
    });
};

exports.clearExpositions = function (req, res) {
    var expo = new Expo();

    // save the contact and check for errors
    Expo.remove({}, function (err) {
        if (err)
            res.json(err);

        res.json({
            message: 'expos cleared',
        });
    });
};

exports.getExpo = function(req,res) {
    Expo.findOne({ name: req.headers.expotag }, function(err, expo) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json(expo);
    });
};
