var mongoose = require('mongoose');

var teamSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    sessionid: {
        type: String,
        required: true
    },
    teamnumber: {
        type: String,
        required: true
    },
    tablenumber: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    ampm: {
        type: String,
        required: true
    }
});


var Team = module.exports = mongoose.model('team', teamSchema);


module.exports.get = function (callback, limit) {
    Team.find(callback).limit(limit);
}