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
	var message    = require('./updateMessage');
	var order      = require('./updateOrders');
	// here we declare the function we use for the image saving
	var imgUpload  = require('./imageUpload');
	// here we save the db
	var database   = {};
	// used as container for the config
	var config     = null;
	// res holder
	var resCopy    = null;
	// id holder
	var idCopy 	   = null;
	// current collection we update
	var collectionCopy = null;
	function setConfig(loadedConfig) {
		console.log('[Admin]SetConfig fired');
		config = loadedConfig;
		// here we set the config there so we can use the prototypes
		carousel.setConfig(loadedConfig);
		category.setConfig(loadedConfig);
		product.setConfig(loadedConfig);
		imgUpload.setConfig(loadedConfig);
		message.setConfig(loadedConfig);
	}

	function auth(logedUsername, logedPassword) {
		if((logedUsername === config.username)&&(logedPassword === config.password)){
			database = {
				"categories": home.getCategoryDatabase(),
				"products"  : home.getProductDatabase(),
				"messages"  : home.getMessagesDatabase(),
				"orders"	: home.getOrdersDatabase()
			};
			return database;
		}
	}
	// here we update the messages into the database
	function updateMessage(element, res) {
		mongoose.connection.db.collection('messages', function (err, collection) {
			console.log('[Admin] updateMessage err: ' + err);
			message.updateMessage(collection, element, updateMessages);
			idCopy  = element.id;
			resCopy = res;
			collectionCopy = collection;
		});
	}
	// here we update the messages into the database
	function updateOrder(element, res) {
		mongoose.connection.db.collection('orders', function (err, collection) {
			console.log('[Admin] updateOrder err: ' + err);
			order.updateOrder(collection, element, updateOrders);
			idCopy  = element.id;
			resCopy = res;
			collectionCopy = collection;
		});
	}
	// here we update products into the database
	function updateCategory(element, res) {
		if((element.username === config.username)&&(element.password === config.password)){
			// we connect to carousel database with the acc and pass
			mongoose.connection.db.collection('categories', function (err, collection) {
				console.log('[Admin] updateCategory err: ' + err);
				category.updateCategory(collection, element, updateCategories);
				idCopy  = element.id;
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
			// we connect to products database with the acc and pass
			mongoose.connection.db.collection('products', function (err, collection) {
				console.log('[Admin] updateProduct err: ' + err);
				product.updateProduct(collection, element, updateProducts);
				idCopy  = element.id;
				resCopy = res;
				collectionCopy = collection;
		    });
		} else {
			return 'Wrong acc or password';
		}
	}

	function updateProducts (err, doc) {
		home.updateProducts(collectionCopy);
		resSend(err);
	}

	function updateMessages  (err, doc) {
		home.updateMessages(collectionCopy);
		resSend(err);
	}

	function updateOrders  (err, doc) {
		home.updateOrders(collectionCopy);
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
				'error'  : false,
				'id'	 : idCopy
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
	    updateProduct : updateProduct,
	    updateMessage : updateMessage,
		updateOrder   : updateOrder,
	    setConfig     : setConfig,
	    connectDb     : connectDb,
	    auth          : auth
	};
}());
