// home. Used for standart users
(function() {
	var config = null;

	// here we use the mongoose to call the api and get the database for the
	// user viewed website
	var mongoose   = require('mongoose');
	// here we save the db with the categories for the nav
	var categoryDatabase = {};
	// here we save the db with the products
	var productsDatabase = {};
	// here we save the db with the carousel iamges and titles
	var carouselDatabase = {};

	function getCategoryDatabase() {
		return categoryDatabase;
	}

	function getProductDatabase() {
		return productsDatabase;
	}
	function getCarouselDatabase() {
		return carouselDatabase;
	}

	function setConfig(loadedConfig) {
		config = loadedConfig;
	}

	function connectDb(){
		// we cache the product list by the viewing user
		mongoose.connection.on('connected', function () {
		    console.log('Mongoose default connection open');
		    mongoose.connection.db.collection('elements', function (err, collection) {
		    	collection.find().toArray(function(err, docs) {
		            productsDatabase = docs;
		   		});
		    });
		    mongoose.connection.db.collection('products', function (err, collection) {
		    	collection.find().toArray(function(err, docs) {
		            categoryDatabase = docs;
		   		});
		    });
		    mongoose.connection.db.collection('carousel', function (err, collection) {
		    	collection.find().toArray(function(err, docs) {
		            carouselDatabase = docs;
		   		});
		    });
		});

		// If the connection throws an error
		mongoose.connection.on('error',function (err) {
		  console.log('Mongoose default connection error: ' + err);
		});

		// When the connection is disconnected
		mongoose.connection.on('disconnected', function () {
		  console.log('Mongoose default connection disconnected');
		});

		// If the Node process ends, close the Mongoose connection
		process.on('SIGINT', function() {
		  mongoose.connection.close(function () {
		    console.log('Mongoose default connection disconnected through app termination');
		    process.exit(0);
		  });
		});
		// get database
		mongoose.connect('mongodb://'+ config.dbUsername +':'+ config.dbPassword + config.api);
	}

	module.exports = {
	    connectDb			: connectDb,
	    setConfig			: setConfig,
	    getCategoryDatabase	: getCategoryDatabase,
	    getProductDatabase	: getProductDatabase,
	    getCarouselDatabase : getCarouselDatabase
	};
}());
