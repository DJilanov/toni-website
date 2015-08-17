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
	function updateContact(collection, element, res) {
		checkForMissingElements(element);
		sendAndReturn(collection, element, res);

	}
	// here we check for missing elements on element creation and we create a new for it
	function checkForMissingElements(element) {
		if(element.logoImg.length == 0) {
			element.logoImg = config.categoryPrototype.logoImg;
		}
		if(element.contactHeader.length == 0) {
			element.contactHeader = config.categoryPrototype.contactHeader;
		}
		if(element.contactBody.length == 0) {
			element.contactBody = config.categoryPrototype.contactBody;
		}
		if(element.contactFooter.length == 0) {
			element.contactFooter = config.categoryPrototype.contactFooter;
		}
		if(typeof element.moreLinks !== "Object") {
			element.moreLinks = config.categoryPrototype.moreLinks;
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
				'categories.$.logoImg': element.logoImg,
				'categories.$.contactHeader': element.contactHeader,
				'categories.$.contactBody': element.contactBody,
				'categories.$.contactFooter': element.contactFooter,
				'categories.$.moreLinks': element.moreLinks
			}
		};
    	collection.update(querry, secondaryQuerry, callback);
	}

	module.exports = {
	    updateContact	: updateContact,
	    setConfig		: setConfig
	};
}());
