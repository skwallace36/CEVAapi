// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
// Initialize the app
let app = express();
let server = require('http').Server(app);

let formidable = require('formidable');
// Import routes
let apiRoutes = require("./routes/api-routes")
let eventRoutes = require("./routes/event-routes")
let sessionRoutes = require("./routes/session-routes")

var cors = require('cors')
app.use(cors())

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Connect to Mongoose and set connection variable
// mongoose.connect('mongodb://localhost/resthub');
mongoose.connect('mongodb://user:password1@ds141902.mlab.com:41902/ceva');

var db = mongoose.connection;
// Setup server port
var port = process.env.PORT || 8080;

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//    next();
// });
// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));

// Use Api routes in the App
app.use('/api', apiRoutes)
app.use('/event', eventRoutes)
app.use('/session', sessionRoutes)


// Launch app to listen to specified port
.listen(port, function() {
    console.log("App is running on port " + port);
});