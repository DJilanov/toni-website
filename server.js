// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get nv.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

// START THE SERVER
// =============================================================================
app.listen(port);

// get database
var mongoose   = require('mongoose');

// generate product model
var Schema = mongoose.Schema;

var Home = new Schema();
var ProductModel = mongoose.model('home', Home);

var database = null;

mongoose.connection.on('open', function (ref) {
  	mongoose.connection.db.collection('home', function (err, collection) {
    	collection.find().toArray(function(err, docs) {
            database = docs;
            mongoose.connection.close();
   		});
    });
});
mongoose.connect('mongodb://user:123456@ds047792.mongolab.com:47792/toni-website')



app.get('/api/home', function (req, res){
	res.json(database);
});

app.get('/api/admin', function (req, res){
	if((req.param('username') === config.username)&&(req.param('password') === config.password)){
		res.json(database);
	}
});
