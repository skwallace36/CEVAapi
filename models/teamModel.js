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
});


var Team = module.exports = mongoose.model('team', teamSchema);


module.exports.get = function (callback, limit) {
    Team.find(callback).limit(limit);
}