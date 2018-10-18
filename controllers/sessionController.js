Session = require('../models/sessionModel');
Event = require('../models/eventModel');
Teams = require('../models/teamModel');
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


exports.getProjectsForSession = function (req, res) {
    console.log(req.headers);

    Event.findOne({year:req.headers.year, semester:req.headers.semester},function(err, event) {
        if (err) {
            res.json(err);
        }
        Teams.find( { sessionid : {$in: [event.amsession, event.pmsession]} } ,function(err,teams) {
            res.json(teams);
        });
        


    });
    // res.json("lol");
};
