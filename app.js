var express = require('express')
var ejs = require('ejs');
var bodyParser = require('body-parser');
var mongo = require('mongodb')
var mongoose = require('mongoose');
var path = require('path');
var app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })) 
// Mongoose Connection 
mongoose.connect('mongodb://gaurav:gaurav123@ds125001.mlab.com:25001/smapp')

var db = mongoose.connection;



db.on('error', console.error.bind(console, 'connection error: '));

//Show that our db is succesfully Connected
db.once('open', function(){
console.log("Connected to Mongo Lab: ");
})

//Set path for the Routes
var routes = require('./routes/index');

//Setting the views
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
 
var port = process.env.PORT || 3000
app.listen(port, function() {
    console.log("App is running on port " + port);
});