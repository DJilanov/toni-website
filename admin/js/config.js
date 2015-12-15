var config = {
	// we set here the interval of the carousel in the front page
	carousel_interval: 4000,
	password_reset_on_days: 1,
	name: 'Toni',
	// office ip
	// api: 'http://10.22.41.68:8080/api/admin',
	// home ip
	// api: 'http://192.168.1.6:8080/api/admin',
	// server ip
	// api: 'http://194.79.15.131:8080/api/admin',
	api: 'http://jilanov.eu:8080/api/admin',
	home 		: '/home',
	carousel 	: '/carousel',
	products 	: '/products',
	category 	: '/category',
	contact 	: '/contact',
	bigImage    : 'big',
	smallImage	: 'small',
	success		: 'Refresh the page to see the changes',

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
		"title": "",
		"description": "",
		"moreInfo": "",
		"oldPrice": "",
		"newPrice": "",
		"offPrice": "",
		"image": "",
		"zIndex": 255,
		"dailyOffer": false,
		"isNew": false,
		"shown": true,
		"type": "product",
		"category": "",
		"id": "",
		"count": "0"
	},

	contactPrototype: {
		"logoImg": "",
		"contactHeader": "Contact Lunes",
		"contactBody": "here is the contact body of lunes contacts",
		"contactFooter": "here is the contact footer",
		"moreLinks": []
	},

	// configurable variables

	// if it is set to true the default of the edit products will be only one tab at a time
	oneAtATime: true
};
