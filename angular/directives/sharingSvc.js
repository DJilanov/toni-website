'use strict';

angular.module('Home').factory('sharingSvc', ['$http',

    function($http) {

    	var productList = {};
    	var productToView = null;
    	// used for the fetch
    	var response = null;
    	var products = null;
    	var categories = null;
    	var carousel = null;

        // we fetch the products and show them. we save them into the array for future direct use
        function getProducts(callback) {
	        if(response === null) {
	        	$http.get(config.api).success(function(data, status, headers, config) {
				    response = data;
				}).error(function(data, status, headers, config) {
				    alert('Error on fetching from the server');
				}).then(function(){
					products = response.products[0];
					categories = response.categories[0];
					carousel = response.carousel[0].carousel;
					callback(products, categories, carousel);
				});
			} else {
				callback(products, categories, carousel);
			}
        }

        function viewProduct(product) {
        	productToView = product;
        }

        function getProductToView() {
        	return productToView;
        }

        return {
            getProducts: getProducts,
            viewProduct: viewProduct,
            getProductToView: getProductToView
        };
    }
]);
