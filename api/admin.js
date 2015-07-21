// admin. Used for editing
(function() {
	// here we use the mongoose to call the api and get the database for the
	// user viewed website
	var mongoose   = require('mongoose');
	// here we declare all functions we use for the standart user interface
	var home       = require('./home');
	// here we save the db
	var database = {};
	// used as container for the config
	var config = null;
	function setConfig(loadedConfig) {
		config = loadedConfig;
	}

	function auth(logedUsername, logedPassword) {
		if((logedUsername === config.username)&&(logedPassword === config.password)){
			return home.getDatabase();
		}
	}

	function update(logedUsername, logedPassword) {
		if((logedUsername === config.username)&&(logedPassword === config.password)){
			var callback = function(err, count, status) {
				console.log('[Admin][Post] callback');
				console.log(err);
				console.log(count);
				console.log(status);
				if(err === null){
					return true;
				} else {
					return false;
				}
			};
			// we connect to home database ith the acc and pass
			mongooseAdmin.connection.db.collection('home', function (err, collection) {
				// query string, new object, callback
		    	collection.update({}, req.param('db'), callback);
		    });
		}
	}

	module.exports = {
	    update: update,
	    setConfig: setConfig,
	    auth: auth
	};
}());
