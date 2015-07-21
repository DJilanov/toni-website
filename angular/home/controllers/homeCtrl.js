'use strict';

angular.module('Home')
    .controller('HomeCtrl', ['$scope', '$location', '$http', 'sharingSvc',
        function ($scope, $location, $http, sharingSvc) {
        	$scope.response = null;
        	$scope.onProductClick = function(product) {
        		sharingSvc.viewProduct(product);
        		$location.path( "/view" );
        	};
        	// we set the products in variable to be shown on screen
        	$scope.setProducts = function(products){
	        	// for toni website we need to show only the today deals on the home
	        	products = {'products': {'1': products}};
	        	// delete upper row for dad website
        		$scope.response = products;
        	};
        	// for toni website we need to show only the today deals on the home
        	var productName = '1';
        	// for dad site we must use = 0
        	// we call the ajax
			sharingSvc.getProducts($scope.setProducts, productName);
		}]);
