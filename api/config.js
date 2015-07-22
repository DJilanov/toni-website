// used as container for the main constants
(function() {
	var config = {
		'dbUsername': 'admin',
		'dbPassword': 'toni1221',
		'username': 'admin',
		'password': 'toni1221',
		'api'     : '@ds047792.mongolab.com:47792/toni-website'
	}
	function getConfig(){
		return config;
	}

	module.exports = {
	    getConfig: getConfig
	};
}());
