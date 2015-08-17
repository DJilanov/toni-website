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
	function updateCarousel(collection, element, res) {
		checkForMissingElements(element);
		sendAndReturn(collection, element, res);

	}
	// here we check for missing elements on element creation and we create a new for it
	function checkForMissingElements(element) {
		if(element.id.length == 0) {
			element.id = new ObjectID();
		}
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
			"carousel": {
				"$elemMatch": {
					"id": element.id
				}
			}
		};
		var secondaryQuerry = {
			$set: {
				'carousel.$.imageDescription': element.imageDescription,
				'carousel.$.url': element.url,
				'carousel.$.zIndex': element.zIndex,
				'carousel.$.shownOnCarousel': element.shownOnCarousel,
				'carousel.$.type': element.type,
				'carousel.$.id': element.id,
			}
		};
    	collection.update(querry, secondaryQuerry, callback);
	}

	module.exports = {
	    updateCarousel	: updateCarousel,
	    setConfig		: setConfig
	};
}());
