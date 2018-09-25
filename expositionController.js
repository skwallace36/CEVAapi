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
