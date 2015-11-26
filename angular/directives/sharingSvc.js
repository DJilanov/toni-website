'use strict';

angular.module('Home').factory('sharingSvc', ['$http',

    function($http) {

    	var productList = {};
    	var productToView 	= null;
    	// used for the fetch
    	var response 		= null;
    	var products 		= null;
    	var categories 		= null;
    	var carousel 		= null;
    	var mainConfig 		= null;
    	var firstTime 		= true;
    	var callbackArray 	= [];

        // we fetch the products and show them. we save them into the array for future direct use
        function getProducts(callback) {
	        if((response === null)&&(firstTime)) {
	        	firstTime = false;
	        	callbackArray.push(callback);
	        	$http.get(config.api).success(function(data, status, headers, config) {
				    response = data;
				}).error(function(data, status, headers, config) {
				    //alert('Error on fetching from the server');
				}).then(function(){
					// we must rework the app to be build whitout the need of this parsing
					products = sortProductsByCategory(response.products);
					categories = response.categories;
					carousel = response.carousel;
					mainConfig = response.mainConfig[0];
					// we set the background if it is avalible
					setBackgroundIfAvalible(mainConfig);
					// return the collections
					for(var callbackCounter = 0; callbackCounter < callbackArray.length; callbackCounter++) {
						callbackArray[callbackCounter](products, categories, carousel);
					}
				});
			} else {
				if(products !== null) {
					callback(products, categories, carousel);
				} else {
					callbackArray.push(callback);
				}

			}
        }

		// we save the products and show alert that it is saved.
		function sendContactForm(callback, form) {
			http = $http({
				method: 'POST',
				url: config.api + '/' + product.type,
				params: data,
				headers: {
					'Content-Type': 'multipart/form-data'
				},
				data: {
					file: data.attachedImage
				}
			});

			http.success(function(data, status, headers, config) {
				response = data;
			})
			.error(function(data, status, headers, config) {
				alert('Error on fetching from the server');
			})
			.then(function(){
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
