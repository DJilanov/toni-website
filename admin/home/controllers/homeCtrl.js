'use strict';

angular.module('Home')
    .controller('HomeCtrl', ['$scope', '$location', '$http', 'sharingSvc',
        function ($scope, $location, $http, sharingSvc) {
        	$scope.login = {
        		username: '',
        		password: ''
        	};
        	$scope.form = true;
        	$scope.list = false;
        	$scope.response = null;
        	$scope.update = function(login) {
        		if((login.username !== '') && (login.password !== '')) {
        			sharingSvc.login($scope.setProducts, login);
        		}
        	};
        	$scope.setProducts = function(response) {
        		$scope.form = false;
        		$scope.list = true;
        		$scope.response = response[0]
        	};

        	// for dad site we must use = 0
        	// we call the ajax
			//
		}]);
