// here we controll the images
(function() {
	// we use the file system to save and load files
	var fs         = require('fs-extra');
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
			  fs.copy(config.imageFolder + config.bigImage + id + '.png', config.imageFolder + config.smallImage + id + '.png', function (err) {
				if (err) return console.error(err)
				  im.resize({
					  srcPath : config.imageFolder + config.smallImage +  id + '.png',
					  dstPath : config.imageFolder + config.smallImage +  id + '.png',
					  width   : config.smallImageWidth,
					  height  : config.smallImageHeight
					}, function(err, stdout, stderr){
					  if (err) console.log('error with ' + config.imageFolder + config.smallImage +  id + '.png');
					  console.log('resized ' + config.imageFolder + config.smallImage + id + '.png' + ' to fit within 256x256px');
					  fs.copy(config.imageFolder + config.smallImage + id + '.png', config.buildImageFolder + config.smallImage + id + '.png', function (err) {
						  if (err) return console.error(err)
						  console.log("success!")
						});
					});
			});

			fs.copy(config.imageFolder + config.bigImage + id + '.png', config.buildImageFolder + config.bigImage + id + '.png', function (err) {
			  if (err) return console.error(err)
			  console.log("success!")
			});
		});
		
	}

	module.exports = {
	    renameAndResizeImage : renameAndResizeImage,
	    setConfig			 : setConfig
	};
}());
