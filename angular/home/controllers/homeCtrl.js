'use strict';

angular.module('Home')
    .controller('HomeCtrl', ['$scope', '$location', '$http', 'sharingSvc',
        function ($scope, $location, $http, sharingSvc) {
        	$scope.response = null;
        	$scope.onProductClick = function(product) {
        		sharingSvc.viewProduct(product);
        		$location.path( "/view" );
        	};
        	// the idea of the function is to get the location so we can use it as name of the products we need to show
        	$scope.getLocation = function() {
        		var location = $location.$$path.split('/')[1];
        		return location;
        	};
        	// we set the products in variable to be shown on screen
        	$scope.setProducts = function(products, categories){
        		// used for title and description
        		$scope.category = categories[$scope.getLocation()];
        		// re sort the products in the way we want
        		var productsId = $scope.category.products;
        		var currentProduct = products[productsId];
        		// we set the sorted products into the products tab
        		$scope.products = $scope.sortProductsByZIndex(currentProduct);
        	};
        	// used to sort products by theirs z index
        	$scope.sortProductsByZIndex = function(products) {
        		var sortedProducts = [];
        		var zIndex = null;
        		var product = {};
        		for(var productCounter = 0; productCounter < products.length; productCounter++) {
        			product = products[productCounter];
        			zIndex = product['z-index'];
        			sortedProducts[zIndex] = product;
        		}
        		return sortedProducts;
        	};
        	// for toni website we need to show only the today deals on the home
        	var productName = '1';
        	// for dad site we must use = 0
        	// we call the ajax
			sharingSvc.getProducts($scope.setProducts, productName);
		}]);
