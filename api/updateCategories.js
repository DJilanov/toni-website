// here we update the carousel. Used only for adding and editing
(function() {
	// we use it for creation of new objects
    var ObjectID = require('mongodb').ObjectID;
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
		if(element.id.length == 0) {
			element.id = new ObjectID();
		}
		if(element.title.length == 0) {
			element.title = config.categoryPrototype.title;
		}
		if(element.description.length == 0) {
			element.description = config.categoryPrototype.description;
		}
		if(element.products.length == 0) {
			element.products = config.categoryPrototype.products;
		}
		if(element.name.length == 0) {
			element.name = config.categoryPrototype.name;
		}
		if(element.zIndex.length == 0) {
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
			"id": element.id
		};
		var secondaryQuerry = {
			$set: {
				'title': element.title,
				'description': element.description,
				'products': element.products,
				'name': element.name,
				'zIndex': element.zIndex,
				'shownOnNav': element.shownOnNav,
				'type': element.type
			}
		};console.log('\n[UpdateCategories] element final:' + JSON.stringify(secondaryQuerry))
		// we check what we gonna do with the element
		if(element.delete === true){
			console.log('\n[UpdateCategories] Deleting element:' + JSON.stringify(element));
			collection.remove(querry, secondaryQuerry, callback);
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
