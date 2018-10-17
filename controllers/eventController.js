
Event = require('../models/eventModel');
Session = require('../models/sessionModel');
Team = require('../models/teamModel')

var uniqid = require('uniqid');

exports.getAllEvents = function (req, res) {
    Event.get(function (err, projects) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json(projects);
    });
    
};


exports.createNewEvent = function (req, res) {
    var event = new Event();
    var uid = uniqid()
    var amuid = uniqid()
    var pmuid = uniqid()
    event.id = uid;
    event.year = req.body.year ? req.body.year : event.year;
    event.semester = req.body.semester ? req.body.semester : event.semester;
    var amSession = new Session();
    amSession.year = req.body.year ? req.body.year : amSession.year;
    amSession.semester = req.body.semester ? req.body.semester : amSession.semester;
    amSession.session = "AM";
    amSession.id = amuid;
    var pmSession = new Session();
    pmSession.year = req.body.year ? req.body.year : pmSession.year;
    pmSession.semester = req.body.semester ? req.body.semester : pmSession.semester;
    pmSession.session = "PM";
    pmSession.id = pmuid;
    event.amsession = amuid
    event.pmsession = pmuid
    
    event.save(function (err) {
        if (err)
            res.json(err);
        amSession.save(function (err) {
            if (err)
                res.json(err);
            pmSession.save(function (err) {
                if (err)
                    res.json(err);
                res.json(event);
            });  
        });  
        
    });  

};



exports.clearEvents = function (req, res) {
    Event.remove({}, function (err) {
        if (err)
            res.json(err);
        Session.remove({}, function (err) {
            if (err)
                res.json(err);
    
            res.json({
                message: 'events and sessions cleared',
            });
        });
    });
};


exports.insertTeam = function(req, res) {
    var teamid = uniqid();
    var team = new Team();
    team.id = teamid;
    
    Session.findOneAndUpdate({semester: req.body.semester, year: req.body.year, session: req.body.session},
        { $push: {teams: teamid } }, function(err, event) {
        if (err)
            res.json(err);
        team.sessionid = event.id;
        team.save(function(err) {
            if (err)
                res.json(err);
            res.json(event);
        });
        
    }); 

};