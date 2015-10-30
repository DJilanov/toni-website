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
	function updateProduct(collection, element, callback) {
		checkForMissingElements(element);
		sendAndReturn(collection, element, callback);

	}
	// here we check for missing elements on element creation and we create a new for it
	function checkForMissingElements(element) {
		if(element.title.length == 0) {
			element.title = config.productPrototype.title;
		}
		if(element.description.length == 0) {
			element.description = config.productPrototype.description;
		}
		if(element.moreInfo.length == 0) {
			element.moreInfo = config.productPrototype.moreInfo;
		}
		if(element.oldPrice.length == 0) {
			element.oldPrice = config.productPrototype.oldPrice;
		}
		if(element.newPrice.length == 0) {
			element.newPrice = config.productPrototype.newPrice;
		}
		if(element.offPrice.length == 0) {
			element.offPrice = config.productPrototype.offPrice;
		}
		if(element.image.length == 0) {
			element.image = config.productPrototype.image;
		}
		if(element.type.length == 0) {
			element.type = config.productPrototype.type;
		}
		if(typeof element.zIndex !== "number") {
			element.zIndex = config.productPrototype.zIndex;
		}
		if(typeof element.shown !== "boolean") {
			element.shown = config.productPrototype.shown;
		}
		if(element.type.length == 0) {
			element.type = config.productPrototype.type;
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
				'moreInfo': element.moreInfo,
				'oldPrice': element.oldPrice,
				'newPrice': element.newPrice,
				'offPrice': element.offPrice,
				'image': element.image,
				'zIndex': element.zIndex,
				'shown': element.shown,
				'type': element.type,
				'category': element.category
			}
		};
		// we check what we gonna do with the element
		if(element.delete === true){
			console.log('Deleting element:' + JSON.stringify(element));
			collection.remove(querry, secondaryQuerry, callback);
		} else {
			console.log('Updating element:' + JSON.stringify(element));
			console.log('Updated element:' + JSON.stringify(secondaryQuerry));
			collection.update(querry, secondaryQuerry, callback);
		}
	}

	module.exports = {
	    updateProduct	: updateProduct,
	    setConfig		: setConfig
	};
}());
