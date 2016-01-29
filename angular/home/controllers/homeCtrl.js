'use strict';

angular.module('Home', ['ngAnimate'])
    .controller('HomeCtrl', ['$scope', '$location', '$http', 'sharingSvc',
        function ($scope, $location, $http, sharingSvc) {
        	$scope.response = null;
        	$scope.config = config;
			// we get the language text
			$scope.text = language.getText();
			// we view the product
			$scope.onProductClick = function(product) {
				sharingSvc.viewProduct(product);
				$location.path( "/view/" + product.link);
			};
        	// we set the products in variable to be shown on screen
        	$scope.setProducts = function(products) {
        		products = $scope.sortProductsByDailyOffer(products);
				products = $scope.sortProductsByZIndex(products);
        		// we set the sorted products into the products tab
        		$scope.products = sortArray(products);
        	};
        	// used to sort witch products are in the daily offer
        	$scope.sortProductsByDailyOffer = function(products) {
        		var dailyOfferProducts = [];
        		for(var categoryCounter = 0; categoryCounter < products.length; categoryCounter++) {
        			for(var productCounter = 0; productCounter < products[categoryCounter].length; productCounter++) {
	        			if(products[categoryCounter][productCounter].dailyOffer === true) {
							products[categoryCounter][productCounter]['zIndex'] = parseInt(products[categoryCounter][productCounter]['zIndex']);
	        				dailyOfferProducts.push(products[categoryCounter][productCounter]);
	        			}
	        		}
        		}
        		return dailyOfferProducts;
        	};
        	// used to sort products by theirs z index
        	$scope.sortProductsByZIndex = function(products) {
        		var sortedProducts = [];
        		var product = {};
        		for(var productCounter = 0; productCounter < products.length; productCounter++) {
        			product = products[productCounter];
					setProduct(product, sortedProducts);
        		}
        		return sortedProducts;
        	};
			function setProduct(product, sortedProducts) {
				var zIndex = product['zIndex'];
				if(sortedProducts[zIndex] !== undefined) {
					product['zIndex']++;
					setProduct(product, sortedProducts);
				} else {
					sortedProducts[zIndex] = product;
				}
			}
			function sortArray(products) {
				var sortedArray = [];
				for(var productCounter = 0; productCounter < products.length; productCounter++) {
					if(products[productCounter] !== undefined) {
						sortedArray.push(products[productCounter]);
					}
				}
				return sortedArray;
			}
        	// for toni website we need to show only the today deals on the home
        	var productName = '1';
        	// for dad site we must use = 0
        	// we call the ajax
			sharingSvc.getProducts($scope.setProducts, productName);
            // we timestamp the images to remove chaching
            $scope.time = Math.floor(Date.now() / 1000);
		}]);
