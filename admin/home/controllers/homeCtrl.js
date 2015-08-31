'use strict';

angular.module('Home')
    .controller('HomeCtrl', ['$scope', '$location', '$http', 'sharingSvc',
        function ($scope, $location, $http, sharingSvc) {
        	$scope.login = {
        		username: '',
        		password: '',
        		remember: false
        	};
        	$scope.form = true;
        	$scope.list = false;
        	$scope.name = config.name;

        	var currentDateTime = (new Date()).getTime();
        	$scope.update = function(login) {
        		if((login.username !== '') && (login.password !== '')) {
        			localStorage.setItem('username', login.username);
        			localStorage.setItem('password', login.password);
        			if((localStorage.getItem('timestamp').length === 0) && (login.remember)) {
	        			var tomorrowDateTime = currentDateTime + config.password_reset_on_days * 60 * 60 * 24;
	        			localStorage.setItem('timestamp', tomorrowDateTime);
        			}
        			sharingSvc.login($scope.setProducts, login);
        		}
        	};
        	$scope.setProducts = function(products, categories, carousel) {
        		$scope.form = false;
        		$scope.list = true;
        	};
        	// TODO: MOVE IT TO THE LIST PLACES!!!
        	// we view the product
        	$scope.onProductClick = function(product) {
        		sharingSvc.viewProduct(product);
        		$location.path( "/edit" );
        	};


        	// we check is there a saved properties
        	if(localStorage.getItem('username').length !== 0) {
        		var username = localStorage.getItem('username');
        		var password = localStorage.getItem('password');
        		var timestamp = localStorage.getItem('timestamp');
        	 	if(timestamp > currentDateTime) {
        	 		var login = {
        	 			username: username,
        	 			password: password
        	 		};
        	 		$scope.update(login);
        	 	} else {
        	 		localStorage.setItem('timestamp', '');
        	 	}
        	}
		}]);
