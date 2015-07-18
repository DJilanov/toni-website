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
			    method: 'POST',
			    url: config.api,
			    data: JSON.stringify(data),
       			headers: {'Content-Type': 'application/json'}
			})
			.success(function(data, status, headers, config) {
					    response = data;
					})
			.error(function(data, status, headers, config) {
			    alert('Error on fetching from the server');
			})
			.then(function(){
				debugger;
			});
       	}
        return {
            login: login
        };
    }
]);
