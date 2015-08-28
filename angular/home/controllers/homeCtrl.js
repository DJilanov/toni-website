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
        	$scope.setProducts = function(products, categories) {
        		// used for title and description
        		$scope.category = categories[$scope.checkCategory(categories)];
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
        			zIndex = product['zIndex'];
        			sortedProducts[zIndex] = product;
        		}
        		return sortedProducts;
        	};
        	// used to get whitch category we are in
        	$scope.checkCategory = function(categories) {
        		for(var categoryCounter = 0; categoryCounter < categories.length; categoryCounter++) {
        			if(categories[categoryCounter].name.toLowerCase() === $scope.getLocation()) {
        				return categoryCounter;
        			}
        		}
        		// if none of them match return the home
        		return 0;
        	};
        	// for toni website we need to show only the today deals on the home
        	var productName = '1';
        	// for dad site we must use = 0
        	// we call the ajax
			sharingSvc.getProducts($scope.setProducts, productName);
		}]);
