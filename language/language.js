var language = (function() {
	'use strict';
	var text = eval(config.defaultLang);
	var setLanguage = function(lang) {
		if(lang === 'bg') {
			text = lang_bg;
		} else if(lang === 'en') {
			text = lang_en;
		}
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
