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
					// we must rework the app to be build whitout the need of this parsing
					products = sortProductsByCategory(response.products);
					categories = response.categories;
					carousel = response.carousel;
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
            getProductToView: getProductToView
        };
    }
]);
