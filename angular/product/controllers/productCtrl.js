'use strict';

angular.module('Product')
    .controller('ProductCtrl', ['$scope', '$location', '$http', 'sharingSvc',
        function ($scope, $location, $http, sharingSvc) {
        	// used to contain the ajax response for the product type
        	$scope.response = null;
        	$scope.test = null;
        	// used to contain the name of the product for the call
        	var productName = null;
        	// the idea of the function is to get the location so we can use it as name of the products we need to show
        	$scope.getLocation = function() {
        		var location = $location.$$path.split('/')[2];

	        	switch(location){
	        		case 'csGo':
	        			return 'csGo';
	        			break;
	        		case 'gridAutoSport':
	        			return 'gridAutoSport';
	        			break;
	        		case 'finalFantasy14':
	        			return 'finalFantasy14';
	        			break;
	        		case 'worldOfTanks':
	        			return 'worldOfTanks';
	        			break;
	        		default:
	        			return 'home';
	        			break;
	        	}
        	}
        	// we set callback function for the fetch
        	$scope.callback = function(products) {
        		$scope.response = products;
        	};
        	// we view the product
        	$scope.onProductClick = function(products) {
        		sharingSvc.viewProduct(product);
        		$location.path( "/view" );
        	};
        	// we get the product we have to fetch
        	var productName = $scope.getLocation();
        	// the idea of the function is to get the location so we can use it as name of the products we need to show
        	sharingSvc.getProducts($scope.callback, productName);

		}]);
