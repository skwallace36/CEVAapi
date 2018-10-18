var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
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
    amsession: {
        type: String,
        required: true
    },
    pmsession: {
        type: String,
        required: true
    }
});


var Event = module.exports = mongoose.model('event', eventSchema);


module.exports.get = function (callback, limit) {
    Event.find(callback).limit(limit);
}