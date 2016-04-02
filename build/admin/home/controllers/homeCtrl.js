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
        			if(login.remember) {
						localStorage.setItem('username', login.username);
						localStorage.setItem('password', login.password);
        			} else {
						localStorage.setItem('username', '');
						localStorage.setItem('password', '');
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
        	if(localStorage.getItem('username') !== undefined) {
        		var username = localStorage.getItem('username');
        		var password = localStorage.getItem('password');
				var login = {
					username: username,
					password: password,
					remember: true
				};
				$scope.update(login);
        	}
		}]);
