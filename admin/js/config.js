var config = {
	// we set here the interval of the carousel in the front page
	carousel_interval: 4000,
	// test api
	api: 'http://localhost:8080/api/admin',
	carousel: '/carousel',
	products: '/products',
	category: '/category',
	contact: '/contact',

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

	// configurable variables

	// if it is set to true the default of the edit products will be only one tab at a time
	oneAtATime: true
};
