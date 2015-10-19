// used as container for the main constants
(function() {
	var config = {
		'dbUsername': 'admin',
		'dbPassword': 'toni1221',
		'username': 'admin',
		'password': 'toni1221',
		'api'     : '@ds047792.mongolab.com:47792/toni-website',
		// will update on each 6000 seconds
		'updateOn': 6000,

		carouselPrototype: {
			"imageDescription": "image1",
			"url": "./img/blank.png",
			"zIndex": 255,
			"shownOnCarousel": true,
			"type": "carousel",
			"id": "0"
		},

		categoryPrototype: {
			"title": "Today's Deals",
			"description": "The best deals and offers across the web. To find out about our deals first every day, subscribe to the Deals Newsletter.",
			"products": "0",
			"name": "Home",
			"zIndex": 0,
			"shownOnNav": false,
			"type": "category",
			"id": "0"
		},

		productPrototype: {
			"title": "Blank",
			"description": "Blank",
			"moreInfo": "Blank",
			"oldPrice": "Blank",
			"newPrice": "Blank",
			"offPrice": "Blank",
			"image": "Blank",
			"zIndex": 255,
			"shown": false,
			"type": "product",
			"category": "",
			"id": ""
		},

		contactPrototype: {
			"logoImg": "",
			"contactHeader": "Contact Lunes",
			"contactBody": "here is the contact body of lunes contacts",
			"contactFooter": "here is the contact footer",
			"moreLinks": []
		},
	};
	function getConfig(){
		return config;
	}

	module.exports = {
	    getConfig: getConfig
	};
}());
