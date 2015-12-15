var language = (function() {
	'use strict';
	var text = eval(config.defaultLang);
	var setLanguage = function(lang) {
		text = eval(lang);
	};
	var getText = function() {
		return text;
	};

	/* GameModel public API */
	return {
		setLanguage  : setLanguage,
		getText    	 : getText
	};
}());
