//Import the mongoose module
var mongoose = require('mongoose');
const config = require("./config/config");

let db_host = config["db"].host;
let db_port = config["db"].port;
let db_name = config["db"].name;
let server_port = config["app"].port;

var mongoDB = `mongodb://${db_host}:${db_port}/${db_name}`;

mongoose.connect(mongoDB);


// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));