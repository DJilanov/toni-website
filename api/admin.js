// admin. Used for editing
(function() {
	// here we use the mongoose to call the api and get the database for the
	var mongoose   = require('mongoose');
	// here we declare all functions we use for the standart user interface
	var home       = require('./home');
	// here we declare all functions we use for the admin user interface
	var carousel   = require('./updateCarousel');
	var category   = require('./updateCategories');
	var product    = require('./updateProducts');
	var contact    = require('./updateContact');
	// here we declare the function we use for the image saving
	var imgUpload  = require('./imageUpload');
	// here we save the db
	var database   = {};
	// used as container for the config
	var config     = null;
	// res holder
	var resCopy    = null;
	// current collection we update
	var collectionCopy = null;
	function setConfig(loadedConfig) {
		console.log('[Admin]SetConfig fired');
		config = loadedConfig;
		// here we set the config there so we can use the carousel prototype
		carousel.setConfig(loadedConfig);
		category.setConfig(loadedConfig);
		product.setConfig(loadedConfig);
		contact.setConfig(loadedConfig);
		imgUpload.setConfig(loadedConfig);
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
	function updateCategory(element, res) {
		if((element.username === config.username)&&(element.password === config.password)){
			// we connect to carousel database ith the acc and pass
			mongoose.connection.db.collection('categories', function (err, collection) {
				console.log('[Admin] updateCategory err: ' + err);
				category.updateCategory(collection, element, updateCategories);
				resCopy = res;
				collectionCopy = collection;
		    });
		} else {
			return 'Wrong acc or password';
		}
	}

	// here we update products into the database
	function updateCarousel(element, res) {
		if((element.username === config.username)&&(element.password === config.password)){
			// we connect to carousel database ith the acc and pass
			mongoose.connection.db.collection('carousel', function (err, collection) {
				console.log('[Admin] updateCarousel err: ' + err);
				carousel.updateCarousel(collection, element, updateCarousels);
				resCopy = res;
				collectionCopy = collection;
		    });
		} else {
			return 'Wrong acc or password';
		}
	}

	// here we update products into the database
	function updateProduct(element, res) {
		if((element.username === config.username)&&(element.password === config.password)){
			// we connect to products database ith the acc and pass
			mongoose.connection.db.collection('products', function (err, collection) {
				console.log('[Admin] updateProduct err: ' + err);
				product.updateProduct(collection, element, updateProducts);
				resCopy = res;
				collectionCopy = collection;
		    });
		} else {
			return 'Wrong acc or password';
		}
	}

	// here we update products into the database
	function updateContact(element, res) {
		if((element.username === config.username)&&(element.password === config.password)){
			// we connect to contact database ith the acc and pass
			mongoose.connection.db.collection('contact', function (err, collection) {
				contact.updateContact(collection, element, res);
		    });
		} else {
			return 'Wrong acc or password';
		}
	}

	function updateProducts (err, doc) {
		home.updateProducts(collectionCopy);
		resSend(err);
	}

	function updateCarousels (err, doc) {
		home.updateCarousels(collectionCopy);
		resSend(err);
	}

	function updateCategories (err, doc) {
		home.updateCategories(collectionCopy);
		resSend(err);
	}

	function resSend(err) {
		if(err) {
			console.log('Error:' + err);
			resCopy.send({
				'updated': false,
				'error': err
			});
		} else {
			resCopy.send({
				'updated': true,
				'error': false
			});
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
	    updateCategory: updateCategory,
	    updateCarousel: updateCarousel,
	    updateProduct : updateProduct,
	    updateContact : updateContact,
	    setConfig     : setConfig,
	    connectDb     : connectDb,
	    auth          : auth
	};
}());
