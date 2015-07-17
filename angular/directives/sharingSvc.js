'use strict';

angular.module('Home').factory('sharingSvc', ['$http',

    function($http) {

    	var productList = {};
    	var response = null;
    	// we send last shown product and we get 5 more from the list.
        function getNextProducts(reportId) {

        }

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

        // will be used for view mode. We will get more info about the product
        function getProductById(id) {

        }

        return {
            getNextProducts: getNextProducts,
            getProducts: getProducts,
            getProductById: getProductById
        };
    }
]);
