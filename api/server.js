// server.js
// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
// here we declare all functions we use for the standart user interface
var home       = require('./home');
// here we declare all functions we use for the admin user interface
var admin      = require('./admin');
// here we declare all constants we gonna use
var config 	   = require('./config');
	config     = config.getConfig();
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
// SET NEEDED VARIABLES
// =============================================================================
// we set the config so we can go into the db
home.setConfig();
// we connect to the db using the credentials and fetch the home and products
home.connectDb();
// we set the config into the admin controller
admin.setConfig(config);
// we connect to the db using the credentials and ready it for updating
admin.connectDb();
// we set the config into the admin controller
admin.setConfig(config);

// START THE SERVER
// =============================================================================
app.listen(port);

// when we call from the home we return the database
app.get('/api/home', function (req, res){
	res.json({
		"categories": home.getCategoryDatabase(),
		"products"  : home.getProductDatabase(),
		"carousel"  : home.getCarouselDatabase(),
		"contact"   : home.getContactDatabase()
	});
});

// when we call from the admin and its with the hardcoded values we return the database
app.get('/api/admin', function (req, res){
	var database = admin.auth(req.param('username'), req.param('password'));
	res.json(database);
});
app.post('/api/admin/product', function (req, res){
	console.log('[Server.js]Post request to products');
	var answer = admin.updateProduct(req.query, res);
	res.json(req.query);
});
app.post('/api/admin/category', function (req, res){
	console.log('[Server.js]Post request to category');
	var answer = admin.updateCategory(req.query, res);
	res.json(req.query);
});
app.post('/api/admin/carousel', function (req, res){
	console.log('[Server.js]Post request to carousel');
	admin.updateCarousel(req.query, res);
});
