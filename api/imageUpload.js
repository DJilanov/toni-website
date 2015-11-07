// here we controll the images
(function() {
	// we use the file system to save and load files
	var fs         = require('fs');
	// we use the image magic to resize the images
	var im         = require('imagemagick');
	// used as container for the config
	var config = null;
	function setConfig(loadedConfig) {
		config = loadedConfig;
	}

	function renameAndResizeImage(path, id) {
		// rename the big image
		fs.rename(path, config.imageFolder + config.bigImage + id + '.png', function(err) {
		    if ( err ) console.log('ERROR: ' + err);
		});
		// resize the big image
		im.resize({
		  srcPath : config.imageFolder + config.bigImage +  id + '.png',
		  dstPath : config.imageFolder + config.bigImage +  id + '.png',
		  width   : config.bigImageWidth,
		  height  : config.bigImageHeight
		}, function(err, stdout, stderr){
		  if (err) console.log('error with ' + config.imageFolder + config.smallImage +  id + '.png');
		  console.log('resized ' + config.imageFolder + config.bigImage + id + '.png' + ' to fit within 256x256px');
		});
		// copy the image so we can have small version
		fs.createReadStream(config.imageFolder + config.bigImage + id + '.png').pipe(fs.createWriteStream(config.imageFolder + config.smallImage + id + '.png'));
		// resize the big image
		im.resize({
		  srcPath : config.imageFolder + config.smallImage +  id + '.png',
		  dstPath : config.imageFolder + config.smallImage +  id + '.png',
		  width   : config.smallImageWidth,
		  height  : config.smallImageHeight
		}, function(err, stdout, stderr){
		  if (err) console.log('error with ' + config.imageFolder + config.smallImage +  id + '.png');
		  console.log('resized ' + config.imageFolder + config.smallImage + id + '.png' + ' to fit within 256x256px');
		});
	}

	module.exports = {
	    renameAndResizeImage : renameAndResizeImage,
	    setConfig			 : setConfig
	};
}());
