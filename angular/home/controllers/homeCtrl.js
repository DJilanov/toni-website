'use strict';

angular.module('Home', ['ngAnimate'])
    .controller('HomeCtrl', ['$scope', '$location', '$http', 'sharingSvc',
        function ($scope, $location, $http, sharingSvc) {
        	$scope.response = null;
        	$scope.config = config;
        	$scope.texts = language.getText();
        	$scope.onProductClick = function(product) {
        		sharingSvc.viewProduct(product);
        		$location.path( "/view" );
        	};
        	// we set the products in variable to be shown on screen
        	$scope.setProducts = function(products) {
        		products = $scope.sortProductsByDailyOffer(products);
        		// we set the sorted products into the products tab
        		$scope.products = products;
        	};
        	// used to sort witch products are in the daily offer
        	$scope.sortProductsByDailyOffer = function(products) {
        		var dailyOfferProducts = [];
        		for(var categoryCounter = 0; categoryCounter < products.length; categoryCounter++) {
        			for(var productCounter = 0; productCounter < products[categoryCounter].length; productCounter++) {
	        			if(products[categoryCounter][productCounter].dailyOffer) {
	        				dailyOfferProducts.push(products[categoryCounter][productCounter]);
	        			}
	        		}
        		}
        		return dailyOfferProducts;
        	};
        	// used to sort products by theirs z index
        	$scope.sortProductsByZIndex = function(products) {
        		var sortedProducts = [];
        		var zIndex = null;
        		var product = {};
        		for(var productCounter = 0; productCounter < products.length; productCounter++) {
        			product = products[productCounter];
        			zIndex = product['zIndex'];
					if(sortedProducts[zIndex] !== undefined) {
						zIndex = 255 + Math.random() * 10000;
					}
        			sortedProducts[zIndex] = product;
        		}
        		return sortedProducts;
        	};
        	// for toni website we need to show only the today deals on the home
        	var productName = '1';
        	// for dad site we must use = 0
        	// we call the ajax
			sharingSvc.getProducts($scope.setProducts, productName);
            // we timestamp the images to remove chaching
            $scope.time = Math.floor(Date.now() / 1000);
		}]);
