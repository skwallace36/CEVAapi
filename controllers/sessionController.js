Session = require('../models/sessionModel');

var uniqid = require('uniqid');

exports.getAllSessions = function (req, res) {
    Session.get(function (err, sessions) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json(sessions);
    });
    
};


