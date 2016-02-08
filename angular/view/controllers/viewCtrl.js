'use strict';

angular.module('View')
    .controller('ViewCtrl', ['$scope', '$routeParams', 'sharingSvc', '$rootScope',
        function ($scope, $routeParams, sharingSvc, $rootScope) {
			// we get the language text
			$scope.text = language.getText();
			// we set the config so it can be usable in the screen
			$scope.config = config;
			// we set the vault
			$scope.vault = config.vaults[config.langs.indexOf(language.getLang())];
        	// used if there is no selected product and have to check witch is with this ID
        	function getProduct(products) {
        		var link = $routeParams.title;
        		for(var colCounter = 0; colCounter < products.length; colCounter++) {
        			for(var prodCounter = 0; prodCounter < products[colCounter].length; prodCounter++) {
        				var product = products[colCounter][prodCounter];
        				if(product.link === link){
							setProduct(product);
        				}
        			}
        		}
        	}
        	var product = sharingSvc.getProductToView(getProduct);
        	if(product !== undefined) {
				setProduct(product);
        	}
			function setProduct(product) {
				$scope.product = product;
				// we set the page title
				$rootScope.pageTitle = product.title;
				$scope.product.difference = parseFloat(product.newPrice) - parseFloat(product.oldPrice);
				$scope.product.amount = 1;
				$scope.product.min = 1;
			}
			// used to controll the amount of
            $scope.increaseAmount = function(bool) {
				if(bool) {
					$scope.product.amount++;
				} else {
					if($scope.product.amount > $scope.product.min) {
						$scope.product.amount--;
					}
				}
			};
			// used to add products to cart
			$scope.addToCart = function() {
				var order = {
					'date': new Date(),
					'product': $scope.product,
					'amount': $scope.product.amount,
					'total': $scope.product.amount * parseFloat($scope.product.newPrice)
				};
				if(localStorage.getItem('cart') === null) {
					localStorage.setItem('cart', JSON.stringify([]));
				}
				var cart = JSON.parse(localStorage.getItem('cart'));
				cart.push(order);
				localStorage.setItem('cart', JSON.stringify(cart));
				alert($scope.text.addToCartSuccess);
			};
		}]);
