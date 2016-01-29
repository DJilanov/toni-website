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
			// we get the language text
			$scope.text = language.getText();
        	// the idea of the function is to get the location so we can use it as name of the products we need to show
        	$scope.getLocation = function() {
        		var location = $location.$$path.split('/')[2];
        		return location;
        	};
        	// we set callback function for the fetch
        	$scope.callback = function(products, categories) {
        		// used for title and description
				for(var categoryCounter = 0; categoryCounter < categories.length; categoryCounter++) {
					if(categories[categoryCounter].link === $scope.getLocation()) {
						$scope.category = categories[categoryCounter];
					}
				}
        		// re sort the products in the way we want
        		var productsId = $scope.category.products;
        		var currentProduct = products[productsId];
				$scope.config = config;
        		// we set the sorted products into the products tab
				products = $scope.sortProductsByZIndex(currentProduct);
				// we set the sorted products into the products tab
				$scope.products = sortArray(products);
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
        	// we view the product
        	$scope.onProductClick = function(product) {
        		sharingSvc.viewProduct(product);
        		$location.path( "/view/" + product.link);
        	};
        	// the idea of the function is to get the location so we can use it as name of the products we need to show
        	sharingSvc.getProducts($scope.callback, productName);
            // we timestamp the images to remove chaching
            $scope.time = Math.floor(Date.now() / 1000);

		}]);
