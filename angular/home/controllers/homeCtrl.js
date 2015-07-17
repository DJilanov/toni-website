'use strict';

angular.module('Home')
    .controller('HomeCtrl', ['$scope', '$location', '$http', 'sharingSvc',
        function ($scope, $location, $http, sharingSvc) {
        	$scope.response = null;
        	// we set the products in variable to be shown on screen
        	$scope.setProducts = function(products){
        		$scope.response = products;
        	};
        	// we call the ajax
			sharingSvc.getProducts($scope.setProducts);
		}]);
