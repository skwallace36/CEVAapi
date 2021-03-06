var mongoose = require('mongoose');

var expoSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    numProjects: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }

});


var Expo = module.exports = mongoose.model('expo', expoSchema);


module.exports.get = function (callback, limit) {
    Expo.find(callback).limit(limit);
}