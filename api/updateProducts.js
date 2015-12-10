// here we update the carousel. Used only for adding and editing
(function() {
	// here we declare the function we use for the image saving
	var imgUpload  = require('./imageUpload');
	// we use it for creation of new objects
	var ObjectId = require('mongodb').ObjectID;
	// used as container for the config
	var config = null;
	// here we contain the callback of the creating image
	var elementCallback = null;
	// here we contain the element we edit
	var product = null;
	function setConfig(loadedConfig) {
		config = loadedConfig;
	}
	// here we update products into the database
	function updateProduct(collection, element, callback) {
		product = JSON.parse(JSON.stringify(element));
		checkForMissingElements(element);
		setCallback(callback);
		sendAndReturn(collection, element, callback);

	}
	// here we check for missing elements on element creation and we create a new for it
	function checkForMissingElements(element) {
		if(element.title == 'auto') {
			element.title = config.productPrototype.title;
		}
		if(element.description == 'auto') {
			element.description = config.productPrototype.description;
		}
		if(element.moreInfo == 'auto') {
			element.moreInfo = config.productPrototype.moreInfo;
		}
		if(element.oldPrice == 'auto') {
			element.oldPrice = config.productPrototype.oldPrice;
		}
		if(element.newPrice == 'auto') {
			element.newPrice = config.productPrototype.newPrice;
		}
		if(element.offPrice == 'auto') {
			element.offPrice = config.productPrototype.offPrice;
		}
		if(typeof element.image !== "boolean") {
			element.image = config.productPrototype.image;
		}
		if(element.type == 'auto') {
			element.type = config.productPrototype.type;
		}
		if(element.zIndex == 'auto') {
			element.zIndex = config.carouselPrototype.zIndex;
		}
		if(typeof element.shown !== "boolean") {
			element.shown = config.productPrototype.shown;
		}
		if(element.dailyOffer == 'auto') {
			element.dailyOffer = config.productPrototype.dailyOffer;
		}
		if((!element.count)||(element.count.length == 0)) {
			element.count = config.productPrototype.count;
		}
		if((element.username !== undefined) && (element.username.length !== 0)) {
			delete element.username;
		}
		if((element.password !== undefined) && (element.password.length !== 0)) {
			delete element.password;
		}
		if(element.changedImage !== undefined) {
			if(element.new === undefined) {
				setImage(element);
			}
			element.image = true;
		}
	}
	// here we set the image to the element
	function setImage(element) {
		imgUpload.renameAndResizeImage(element.attachedImagePath, element._id);
		delete element.changedImage;
		delete element.attachedImagePath;
		delete element.buffer;
		element.image = true;
	}
	// here we send the element to the database and we return info
	function sendAndReturn(collection, element, callback) {
		var querry = {
			"_id": ObjectId(element._id)
		};
		var secondaryQuerry = {
			$set: {
				'title': element.title,
				'description': element.description,
				'dailyOffer': element.dailyOffer,
				'moreInfo': element.moreInfo,
				'oldPrice': element.oldPrice,
				'newPrice': element.newPrice,
				'offPrice': element.offPrice,
				'image': element.image,
				'zIndex': element.zIndex,
				'shown': element.shown,
				'type': element.type,
				'category': element.category,
				'count': element.count,
				'isNew': element.isNew
			}
		};
		// we check what we gonna do with the element
		if(element.delete === 'true'){
			console.log('\n[UpdateProduct] Deleting element:' + JSON.stringify(element));
			collection.deleteOne(querry, callback);
		} else if(element.new) {
			var data = secondaryQuerry['$set'];
			data.id = querry.id;
			console.log('\n[UpdateProduct] Creating element:' + JSON.stringify(element));
			collection.insertOne(data, activateCallback);
		} else {
			console.log('\n[UpdateProduct] Updating element:' + JSON.stringify(element));
			collection.update(querry, secondaryQuerry, callback);
		}
	}

	function setCallback(callback) {
		elementCallback = callback;
	}

	function activateCallback(err, result) {
		if(err){
			console.log('[UpdateProducts] activateCallback error ' + err);
		}
		// we set the id to the product so we can put the image
		product._id = result.ops[0]._id;
		setImage(product);
		console.log('New Element ID: ' + product._id)
		elementCallback();
	}

	module.exports = {
	    updateProduct	: updateProduct,
	    setConfig		: setConfig
	};
}());
