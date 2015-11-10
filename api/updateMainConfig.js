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
	function updateMainConfig(collection, element, callback) {
		checkForMissingElements(element);
		sendAndReturn(collection, element, callback);

	}
	// here we check for missing elements on element creation and we create a new for it
	function checkForMissingElements(element) {
		if(element.changedImage !== undefined) {
			imgUpload.renameAndResizeImage(element.attachedImagePath, element.id, 'background');
			delete element.changedImage;
			delete element.attachedImagePath;
			delete element.buffer;
			element.showBackgroundImg = true;
		}
	}
	// here we send the element to the database and we return info
	function sendAndReturn(collection, element, callback) {
		var querry = {
			"backgroundImgUrl": config.backgroundImgUrl
		};
		var secondaryQuerry = {
			$set: {
				'showBackgroundImg': element.showBackgroundImg,
				'backupOn': element.backupOn
			}
		};
		// we check what we gonna do with the element
		if(element.delete === true){
			console.log('\n[updateMainConfig] Deleting element:' + JSON.stringify(element));
			collection.remove(querry, secondaryQuerry, callback);
		} else {
			console.log('\n[updateMainConfig] Updating element:' + JSON.stringify(element));
			console.log('\n[updateMainConfig] Updated element:' + JSON.stringify(secondaryQuerry));
			collection.update(querry, secondaryQuerry, callback);
		}
	}

	module.exports = {
	    updateCarousel	: updateCarousel,
	    setConfig		: setConfig
	};
}());
