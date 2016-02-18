'use strict';

angular.module('Home').factory('sharingSvc', ['$http',

    function($http) {

    	var productToView 	= null;
    	// used for the fetch
    	var response 		= null;
    	var products 		= null;
    	var categories 		= null;
    	var firstTime 		= true;
    	var callbackArray 	= [];
		var loaded = false;

        // we fetch the products and show them. we save them into the array for future direct use
        function getProducts(callback) {
	        if((response === null)&&(firstTime)) {
	        	firstTime = false;
	        	callbackArray.push(callback);
				returnDummy(callback);
	        	$http.get(config.api).success(function(data, status, headers, config) {
				    response = data;
				}).error(function(data, status, headers, config) {
				    alert('Error on fetching from the server');
				}).then(function(){
					loaded = true;
					console.log('finish');
					// we must rework the app to be build whitout the need of this parsing
					products = sortProductsByCategory(response.products);
					categories = response.categories;
					for(var categoriesCounter = 0; categoriesCounter < categories.length; categoriesCounter++) {
						if (typeof categories[categoriesCounter].info === 'string') {
							categories[categoriesCounter].info = JSON.parse(categories[categoriesCounter].info);
						}
					}
					// return the collections
					for(var callbackCounter = 0; callbackCounter < callbackArray.length; callbackCounter++) {
						callbackArray[callbackCounter](products, categories);
					}
				});
			} else {
				if(loaded) {
					callback(products, categories);
				} else {
					console.log('call');
					callbackArray.push(callback);
					returnDummy(callback);

				}

			}
        }

		function returnDummy(callback) {
			response = config.responsePrototype;
			products = sortProductsByCategory(response.products);
			categories = response.categories;
			for(var categoriesCounter = 0; categoriesCounter < categories.length; categoriesCounter++) {
				if (typeof categories[categoriesCounter].info === 'string') {
					categories[categoriesCounter].info = JSON.parse(categories[categoriesCounter].info);
				}
			}
			callback(products, categories);
		}
		// we save the products and show alert that it is saved.
		function sendContactForm(callback, form) {
			grecaptcha.reset();
			form.new = 'true';
			$http.post(config.api + '/message',form)
				.success(function(data, status, headers, config) {
					response = data;
				}).error(function(data, status, headers, config) {
					alert('Error on fetching from the server');
				}).then(function(){
					if(response != null) {
						callback(response);
					}

				});
		}

        function setBackgroundIfAvalible(config) {
        	if(config.showBackgroundImg) {
        		document.getElementById('screen').style.background = "url('img/background.png') no-repeat right top";
        		document.getElementById('screen').style.backgroundSize = "100%";
        	}
        }

        function viewProduct(product) {
        	productToView = product;
        }

        function getProductToView(callback) {
          if(productToView != undefined) {
            return productToView;
          } else {
            getProducts(callback);
          }

        }
       	// the idea from that function is that after we get
       	function sortProductsByCategory(products) {
       		var sortedProducts = [];
       		var product = {};
       		var category = null;
       		for(var productCounter = 0; productCounter < products.length; productCounter++) {
       			product = products[productCounter];
				product.dailyOffer = JSON.parse(product.dailyOffer);
				product.isNew = JSON.parse(product.isNew);
				if(product.carousel !== undefined) {
					product.carousel = JSON.parse(product.carousel);
				}
       			category = parseInt(product.category);
       			if(sortedProducts[category] === undefined) {
       				sortedProducts[category] = [];
       			}
       			sortedProducts[category][sortedProducts[category].length] = product;
       		}
       		return sortedProducts;
       	}

        return {
            getProducts: getProducts,
            viewProduct: viewProduct,
            getProductToView: getProductToView,
			sendContactForm: sendContactForm
        };
    }
]);
