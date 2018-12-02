
Event = require('../models/eventModel');
Session = require('../models/sessionModel');
Team = require('../models/teamModel')
let formidable = require('formidable');
var uniqid = require('uniqid');
var XLSX = require('xlsx'), request = require('request');
let readXlsxFile = require('read-excel-file/node');

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


exports.getEventTeams = function(req,res) {

    // console.log(req.headers.eventid);
    Event.findOne({ id : req.headers.eventid}, function(err, event) {
        if(err)
            res.json(err);
        amsession = '';
        pmsession = '';
        Team.find({ sessionid : event.amsession}, function(err, teams) {
            if(err)
                res.json(err);
            amsession = teams;
            Team.find({ sessionid : event.pmsession}, function(err, teams2) {
                if(err)
                    res.json(err);
                pmsession = teams2;
                res.json([amsession,pmsession]);
            });

        });        
    });
}


exports.postTeams = function(req, res) {
    var form = new formidable.IncomingForm();
    // form.parse(req);
    var amsession;
    form.parse(req, function(err, fields, files) {
        // console.log(fields);
        // console.log(files.uploadFile);
        // console.log(files.file);
        readXlsxFile(files.uploadFile.path).then((rows) => {
            for(let r in rows) {
                var team = new Team();
                team.id = uniqid();
                team.teamnumber = rows[r][0];  
                groupsession = rows[r][1];
                if (groupsession.indexOf('Session 1') > -1) {
                    team.sessionid = fields.amsession;
                    team.ampm = "am";
                }
                if (groupsession.indexOf('Session 2') > -1) {
                    team.sessionid = fields.pmsession;
                    team.ampm = "pm";
                }
                team.tablenumber = rows[r][2];
                team.name = rows[r][3];
                team.description = rows[r][4];
                team.section = rows[r][5];
                team.save(function(err) {

                });

            }
        })
    });
       
    
    res.json({'success':'true'});
}

exports.voteForTeam = function(req,res) {
    Team.findOneAndUpdate({ id: req.body.id }, { $inc: {votes: 1}}, {new: true}, function(err, proj) {
        if (err) {
            res.json(err);
        }
        res.json(proj);
    });
}