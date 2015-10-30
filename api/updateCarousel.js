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
	function updateCarousel(collection, element, callback) {
		checkForMissingElements(element);
		sendAndReturn(collection, element, callback);

	}
	// here we check for missing elements on element creation and we create a new for it
	function checkForMissingElements(element) {
		if(element.imageDescription.length == 0) {
			element.imageDescription = config.carouselPrototype.imageDescription;
		}
		if(element.url.length == 0) {
			element.url = config.carouselPrototype.url;
		}
		if(typeof element.zIndex !== "number") {
			element.zIndex = config.carouselPrototype.zIndex;
		}
		if(typeof element.shownOnCarousel !== "boolean") {
			element.shownOnCarousel = config.carouselPrototype.shownOnCarousel;
		}
		if(element.type.length == 0) {
			element.type = config.carouselPrototype.type;
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
				'imageDescription': element.imageDescription,
				'url': element.url,
				'zIndex': element.zIndex,
				'shownOnCarousel': element.shownOnCarousel,
				'type': element.type
			}
		};
		// we check what we gonna do with the element
		if(element.delete === true){
			console.log('\n[UpdateCarousel] Deleting element:' + JSON.stringify(element));
			collection.remove(querry, secondaryQuerry, callback);
		} else {
			console.log('\n[UpdateCarousel] Updating element:' + JSON.stringify(element));
			console.log('\n[UpdateCarousel] Updated element:' + JSON.stringify(secondaryQuerry));
			collection.update(querry, secondaryQuerry, callback);
		}
	}

	module.exports = {
	    updateCarousel	: updateCarousel,
	    setConfig		: setConfig
	};
}());
