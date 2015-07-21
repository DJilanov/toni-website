'use strict';

angular.module('Home').factory('sharingSvc', ['$http',

    function($http) {

    	var productList = {};
    	var response = null;
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
				if(response != null) {
					callback(response);
					window.test = response;
				}

			});
		}
        // we save the products and show alert that it is saved.
        function save(callback, db) {
        	var data = userIds;
        	// we must update database and push it here
        	data.db = db;
	       	$http({
			    method: 'GET',
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



        function viewProduct(product) {
        	productToView = product;
        }

        function getProductToView() {
        	return productToView;
        }

        return {
            login: login,
            save: save,
            viewProduct: viewProduct,
            getProductToView: getProductToView
        };
    }
]);
