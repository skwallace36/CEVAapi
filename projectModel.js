var mongoose = require('mongoose');

var projectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    teamMembers: {
        type: [String],
        required: true
    },
    teamId: {
        type: String,
        required: true
    },
    votes: {
        type: Number,
        required: true
    },
    comments: {
        type: [String],
        required: true
    },
    expo: {
        type: String,
        required: true
    }
});


var Project = module.exports = mongoose.model('project', projectSchema);


module.exports.get = function (callback, limit) {
    Project.find(callback).limit(limit);
}