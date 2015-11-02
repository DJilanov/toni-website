// here we controll the images
(function() {
	// we use the file system to save and load files
	var fs         = require('fs');
	// used as container for the config
	var config = null;
	function setConfig(loadedConfig) {
		config = loadedConfig;
	}

	function readFile(image, id) {
		fs.readFile(image, function (err, data) {
			console.log(image);

			/// If there's an error
			if(!image){
				return "There was an error";
			} else {

			  var path = config.imageFolder + id;

			  /// write image to folder and return error or the path
			  fs.writeFile(path, data, function (err) {
			  	if(err === undefined) {
			  		return path;
			  	} else{
			  		return "There was an error";
			  	}
			  });
			}
		});
	}

	module.exports = {
	    readFile	: readFile,
	    setConfig		: setConfig
	};
}());
