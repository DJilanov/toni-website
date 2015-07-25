'use strict';

angular.module('Product')
    .controller('ProductCtrl', ['$scope', '$location', '$http', 'sharingSvc',
        function ($scope, $location, $http, sharingSvc) {
        	// used to contain the ajax response for the category type
        	$scope.category = null;
        	// used to contain the ajax response for the products
        	$scope.products = null;
        	// used to contain the name of the product for the call
        	var productName = null;
        	// the idea of the function is to get the location so we can use it as name of the products we need to show
        	$scope.getLocation = function() {
        		var location = $location.$$path.split('/')[2];
        		return location;
        	};
        	// we set callback function for the fetch
        	$scope.callback = function(products, categories) {
        		// used for title and description
        		$scope.category = categories[$scope.getLocation()];
        		// re sort the products in the way we want
        		var productsId = $scope.category.products;
        		var currentProduct = products[productsId];
        		// we set the sorted products into the products tab
        		$scope.products = $scope.sortProductsByZIndex(currentProduct);
        	};
        	$scope.sortProductsByZIndex = function(products) {
        		for(var productCounter = 0; productCounter < products.length; productCounter++) {

        		}
        	};
        	// we view the product
        	$scope.onProductClick = function(products) {
        		sharingSvc.viewProduct(product);
        		$location.path( "/view" );
        	};
        	// the idea of the function is to get the location so we can use it as name of the products we need to show
        	sharingSvc.getProducts($scope.callback, productName);

		}]);
