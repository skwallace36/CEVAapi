var mongoose = require('mongoose');

var sessionSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true
    },
    teams: {
        type: [String],
        requird: true
    },
    session: {
        type: String,
        required: true
    },
});


var Session = module.exports = mongoose.model('session', sessionSchema);


module.exports.get = function (callback, limit) {
    Session.find(callback).limit(limit);
}