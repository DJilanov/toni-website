var language = (function() {
	'use strict';
	var text = eval(config.defaultLang);
	var language = config.defaultLang;
	var setLanguage = function(lang) {
		text = eval(lang);
		language = lang;
	};
	var getText = function() {
		return text;
	};

	var getLang = function() {
		return language;
	};

	/* GameModel public API */
	return {
		setLanguage  : setLanguage,
		getText    	 : getText,
		getLang		 : getLang
	};
}());
