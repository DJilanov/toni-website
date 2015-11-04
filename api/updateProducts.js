// here we update the carousel. Used only for adding and editing
(function() {
	// here we declare the function we use for the image saving
	var imgUpload  = require('./imageUpload');
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
		if(typeof element.image !== "boolean") {
			element.image = config.productPrototype.image;
		}
		if(element.type.length == 0) {
			element.type = config.productPrototype.type;
		}
		if(element.zIndex.length == 0) {
			element.zIndex = config.carouselPrototype.zIndex;
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
		if(element.changedImage !== undefined) {
			imgUpload.renameAndResizeImage(element.attachedImagePath, element.id);
			delete element.changedImage;
			delete element.attachedImagePath;
			delete element.buffer;
			element.image = true;
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
			console.log('\n[UpdateProduct] Deleting element:' + JSON.stringify(element));
			collection.remove(querry, secondaryQuerry, callback);
		} else {
			console.log('\n[UpdateProduct] Updating element:' + JSON.stringify(element));
			console.log('\n[UpdateProduct] Updated element:' + JSON.stringify(secondaryQuerry));
			collection.update(querry, secondaryQuerry, callback);
		}
	}

	module.exports = {
	    updateProduct	: updateProduct,
	    setConfig		: setConfig
	};
}());
