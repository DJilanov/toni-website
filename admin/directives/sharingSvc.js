'use strict';

angular.module('Home').factory('sharingSvc', ['$http',

    function($http) {

    	var productList = {};
    	var response = null;
        // we fetch the products and show them. we save them into the array for future direct use
        function login(callback, id) {debugger;
        	var data = {
		    	"username": id.username,
		    	"password": id.password
		    };
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
        return {
            login: login
        };
    }
]);
