'use strict';

angular.module('Home').factory('sharingSvc', ['$http',

    function($http) {

    	var productList = {};
    	var response = null;
    	var productToView = null;

        // we fetch the products and show them. we save them into the array for future direct use
        function getProducts(callback, type) {
	        if(response === null) {
	        	$http.get(config.api).success(function(data, status, headers, config) {
				    response = data;
				}).
				  error(function(data, status, headers, config) {
				    alert('Error on fetching from the server');
				}).then(function(){
					if(type != null){
						callback(response[0].products[type]);
					} else {
						callback(response[0]);
					}

				});
			} else {
				// if we already had fetched the elements
				if(type !== undefined){
					callback(response[0].products[type]);
				} else {
					callback(response[0]);
				}
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
