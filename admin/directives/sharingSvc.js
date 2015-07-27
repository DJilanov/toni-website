'use strict';

angular.module('Home').factory('sharingSvc', ['$http',

    function($http) {

    	var productList = {};
    	// used for the fetch
    	var response = null;
    	var products = null;
    	var categories = null;
    	var carousel = null;

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
				if(response !== "") {
					products = response.products[0];
					categories = response.categories[0];
					carousel = response.carousel[0].carousel;
					callback(products, categories, carousel);
				} else {
					alert("Wrong password noob!")
				}

			});
		}
        // we save the products and show alert that it is saved.
        function save(callback, db) {
        	var data = userIds;
        	// we must update database and push it here
        	data.db = db;
	       	$http({
			    method: 'POST',
			    url: config.api,
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

        function viewProduct(product) {
        	productToView = product;
        }

        function getProductToView() {
        	return productToView;
        }

        return {
            login			: login,
            saved			: save,
            viewProduct		: viewProduct,
            getProductToView: getProductToView,
            getProducts		: getProducts
        };
    }
]);
