'use strict';

angular.module('Home').factory('sharingSvc', ['$http',

    function($http) {

    	var productList = {};
    	// used for the fetch
    	var response   = null;
    	var products   = null;
    	var categories = null;
    	var carousel   = null;
    	var contact    = null;

    	var userIds = {};
    	var productToView = null;
        // we fetch the products and show them. we save them into the array for future direct use
        function login(callback, id) {
        	var id = {
		    	"username": id.username,
		    	"password": id.password
		    };
	       	$http({
			    method: 'GET',
			    url: config.api,
			    params: id,
       			headers: {'Content-Type': 'application/json'}
			})
			.success(function(data, status, headers, config) {
			    response = data;
			    userIds = id;
			})
			.error(function(data, status, headers, config) {
			    alert('Error on fetching from the server');
			})
			.then(function(){
				if(response !== "") {debugger;
					products = response.products[0];
					categories = response.categories[0].categories;
					carousel = response.carousel[0].carousel;
					contact = response.contact[0];

					callback(products, categories, carousel, contact);
				} else {
					// if tony is a noob
					alert("WRONG PASSWORD NOOB, DELETE THE GAME PLEASE!");
				}

			});
		}
        // we save the products and show alert that it is saved.
        function save(callback, product, location) {
        	var data = product;
        	data.id = userIds;
	       	$http({
			    method: 'POST',
			    url: config.api + location,
			    params: data,
       			headers: {'Content-Type': 'application/json'}
			})
			.success(function(data, status, headers, config) {
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

       	function getProducts(callback) {
			callback(products, categories, carousel);
       	}

        return {
            login			: login,
            save			: save,
            getProducts		: getProducts
        };
    }
]);
