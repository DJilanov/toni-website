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
	function updateProduct(collection, element, res) {
		checkForMissingElements(element);
		sendAndReturn(collection, element, res);

	}
	// here we check for missing elements on element creation and we create a new for it
	function checkForMissingElements(element) {
		if(element.id.length == 0) {
			element.id = new ObjectID();
		}
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
			"products": {
				"$elemMatch": {
					"id": element.id
				}
			}
		};
		var secondaryQuerry = {
			$set: {
				'products.$.title': element.title,
				'products.$.description': element.description,
				'products.$.moreInfo': element.moreInfo,
				'products.$.oldPrice': element.oldPrice,
				'products.$.newPrice': element.newPrice,
				'products.$.offPrice': element.offPrice,
				'products.$.image': element.image,
				'products.$.zIndex': element.zIndex,
				'products.$.shown': element.shown,
				'products.$.type': element.type,
				'products.$.id': element.id,
			}
		};
		// we check what we gonna do with the element
		if(element.delete === true){
			console.log('Deleting element:' + element);
			collection.remove(querry, secondaryQuerry, callback);
		} else {
			console.log('Updating element:' + element);
			collection.update(querry, secondaryQuerry, callback);
		}
	}

	module.exports = {
	    updateProduct	: updateProduct,
	    setConfig		: setConfig
	};
}());
