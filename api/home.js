// home. Used for standart users
(function() {
	var config = null;

	// here we use the mongoose to call the api and get the database for the
	// user viewed website
	var mongoose   = require('mongoose');
	// here we save the db with the categories for the nav
	var categoryDatabase   = {};
	// here we save the db with the products
	var productsDatabase   = {};
	// here we save the db with the contact iamges and titles
	var messageDatabase    = {};
	// here we save the db with the contact iamges and titles
	var mainConfigDatabase = {};

	function getCategoryDatabase() {
		return categoryDatabase;
	}

	function getProductDatabase() {
		return productsDatabase;
	}

	function getMessagesDatabase() {
		return messageDatabase;
	}

	function setConfig(loadedConfig) {
		config = loadedConfig;
	}

	function updateProducts(collection) {
		collection.find().toArray(function(err, docs) {
	        productsDatabase = docs;
	    });
	}

	function updateCategories(collection) {
		collection.find().toArray(function(err, docs) {
	        categoryDatabase = docs;
	    });
	}

	function updateMainConfigs(collection) {
		collection.find().toArray(function(err, docs) {
	        mainConfigDatabase = docs;
	    });
	}

	function updateMessages(collection) {
		collection.find().toArray(function(err, docs) {
			messageDatabase = docs;
		});
	}

	function connectDb(){
		// we cache the product list by the viewing user
		mongoose.connection.on('connected', function () {
		    console.log('[Home.js]Mongoose default connection open');
		    mongoose.connection.db.collection('products', function (err, collection) {
		    	collection.find().toArray(function(err, docs) {
		            productsDatabase = docs;
		   		});
		    });
		    mongoose.connection.db.collection('categories', function (err, collection) {
		    	collection.find().toArray(function(err, docs) {
		            categoryDatabase = docs;
		   		});
		    });
			mongoose.connection.db.collection('messages', function (err, collection) {
				collection.find().toArray(function(err, docs) {
					messageDatabase = docs;
				});
			});
		});

		// If the connection throws an error
		mongoose.connection.on('error',function (err) {
		  console.log('[Home.js]Mongoose default connection error: ' + err);
		});

		// When the connection is disconnected
		mongoose.connection.on('disconnected', function () {
		  console.log('[Home.js]Mongoose default connection disconnected');
		});

		// If the Node process ends, close the Mongoose connection
		process.on('SIGINT', function() {
		  mongoose.connection.close(function () {
		    console.log('[Home.js]Mongoose default connection disconnected through app termination');
		    process.exit(0);
		  });
		});
		// get database
		// mongoose.connect('mongodb://'+ config.dbUsername +':'+ config.dbPassword + config.api);
		mongoose.connect('mongodb://admin:toni1221@ds047792.mongolab.com:47792/toni-website');
	}

	module.exports = {
	    connectDb			 : connectDb,
	    setConfig			 : setConfig,
	    getCategoryDatabase	 : getCategoryDatabase,
	    getProductDatabase	 : getProductDatabase,
		getMessagesDatabase	 : getMessagesDatabase,
	    updateProducts		 : updateProducts,
	    updateCategories	 : updateCategories,
	    updateMainConfigs	 : updateMainConfigs,
		updateMessages		 : updateMessages
	};
}());
