// here we update the carousel. Used only for adding and editing
(function() {
	// we use it for creation of new objects
    var ObjectId = require('mongodb').ObjectID;
	// used as container for the config
	var config = null;
	function setConfig(loadedConfig) {
		config = loadedConfig;
	}

	// here we update products into the database
	function updateCategory(collection, element, callback) {
		checkForMissingElements(element);
		sendAndReturn(collection, element, callback);

	}
	// here we check for missing elements on element creation and we create a new for it
	function checkForMissingElements(element) {
		if(element.products.length == 0) {
			element.products = config.categoryPrototype.products;
		}
		if(element.name == 'auto') {
			element.name = config.categoryPrototype.name;
		}
		if(element.zIndex == 'auto') {
			element.zIndex = config.carouselPrototype.zIndex;
		}
		if(element.type.length == 0) {
			element.type = config.categoryPrototype.type;
		}
		if((element.username !== undefined) && (element.username.length !== 0)) {
			delete element.username;
		}
		if((element.password !== undefined) && (element.password.length !== 0)) {
			delete element.password;
		}

	}
	// here we send the element to the database and we return info
	function sendAndReturn(collection, element, callback) {
		var querry = {
			"_id": ObjectId(element._id)
		};
		if (typeof element.info !== 'string') {
			element.info = JSON.stringify(element.info)
		}
		var secondaryQuerry = {
			$set: {
				'info': element.info,
				'products': element.products,
				'zIndex': element.zIndex,
				'shownOnNav': element.shownOnNav,
				'type': element.type
			}
		};
		// we check what we gonna do with the element
		if(element.delete === 'true'){
			console.log('\n[UpdateCategories] Deleting element:' + JSON.stringify(element));
			console.log('delete query: ' + JSON.stringify(querry));
			collection.deleteOne(querry, callback);
		} else if(element.new === 'true'){
			console.log('\n[UpdateCategories] Creating element:' + JSON.stringify(element));
			var data = secondaryQuerry['$set'];
			collection.insertOne(data, callback);
		} else {
			console.log('\n[UpdateCategories] Updating element:' + JSON.stringify(element));
			collection.update(querry, secondaryQuerry, callback);
		}
	}

	module.exports = {
	    updateCategory	: updateCategory,
	    setConfig		: setConfig
	};
}());
