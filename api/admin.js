// admin. Used for editing
(function() {
	// here we use the mongoose to call the api and get the database for the
	// user viewed website
	var mongoose   = require('mongoose');
	// here we declare all functions we use for the standart user interface
	var home       = require('./home');
	// here we save the db
	var database = {};
	// used as container for the config
	var config = null;
	function setConfig(loadedConfig) {
		config = loadedConfig;
	}

	function auth(logedUsername, logedPassword) {
		if((logedUsername === config.username)&&(logedPassword === config.password)){
			database = {
				"categories": home.getCategoryDatabase(),
				"products": home.getProductDatabase(),
				"carousel": home.getCarouselDatabase(),
				"contact"   : home.getContactDatabase()
			};
			return database;
		}
	}
	// here we update products into the database
	function updateProducts(logedUsername, logedPassword, element) {
		if((logedUsername === config.username)&&(logedPassword === config.password)){
			var callback = function(err, count, status) {
				console.log('[Admin] update products callback');
				console.log(err);
				console.log(count);
				console.log(status);
				if(err === null){
					return true;
				} else {
					return false;
				}
			};
			// TODO: FIX ISSUES WITH THE DATABASE. CHANGE ITS LOGIC AND IMPLEMENT UPDATE BY ID
			// we connect to home database ith the acc and pass
			mongoose.connection.db.collection('products', function (err, collection) {
		    	collection.find().toArray(function(err, docs) {
		            productsDatabase = docs;
		   		});
		    });
		} else {
			return 'Wrong acc or password';
		}
	}

	// connect to db so we can update
	function connectDb() {
		// we cache the product list by the viewing user
		mongoose.connection.on('connected', function () {
		    console.log('[Admin.js]Mongoose default connection open');
		});

		// If the connection throws an error
		mongoose.connection.on('error',function (err) {
		  console.log('[Admin.js]Mongoose default connection error: ' + err);
		});

		// When the connection is disconnected
		mongoose.connection.on('disconnected', function () {
		  console.log('[Admin.js]Mongoose default connection disconnected');
		});

		// If the Node process ends, close the Mongoose connection
		process.on('SIGINT', function() {
		  mongoose.connection.close(function () {
		    console.log('[Admin.js]Mongoose default connection disconnected through app termination');
		    process.exit(0);
		  });
		});
		// get database
		mongoose.connect('mongodb://'+ config.dbUsername +':'+ config.dbPassword + config.api);
	}

	module.exports = {
	    updateProducts: updateProducts,
	    setConfig     : setConfig,
	    connectDb     : connectDb,
	    auth          : auth
	};
}());
