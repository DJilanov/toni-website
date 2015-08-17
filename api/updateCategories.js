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
	function updateCategory(collection, element, res) {
		checkForMissingElements(element);
		sendAndReturn(collection, element, res);

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
		if(typeof element.zIndex !== "number") {
			element.zIndex = config.categoryPrototype.zIndex;
		}
		if(typeof element.shownOnNav !== "boolean") {
			element.shownOnNav = config.categoryPrototype.shownOnNav;
		}
		if(element.type.length == 0) {
			element.type = config.categoryPrototype.type;
		}
	}
	// here we send the element to the database and we return info
	function sendAndReturn(collection, element, res) {
		var callback = function(err, doc) {
			console.log(err);
			if(err) {
				res.send({
					'updated': false,
					'error': err
				});
			} else {
				res.send({
					'updated': true,
					'newProduct': doc
				});
			}
		};
		var querry = {
			"categories": {
				"$elemMatch": {
					"id": element.id
				}
			}
		};
		var secondaryQuerry = {
			$set: {
				'categories.$.title': element.title,
				'categories.$.description': element.description,
				'categories.$.zIndex': element.zIndex,
				'categories.$.products': element.products,
				'categories.$.type': element.type,
				'categories.$.name': element.name,
				'categories.$.id': element.id,
			}
		};
    	collection.update(querry, secondaryQuerry, callback);
	}

	module.exports = {
	    updateCategory	: updateCategory,
	    setConfig		: setConfig
	};
}());
