'use strict';

angular.module('View')
    .controller('ViewCtrl', ['$scope', '$routeParams', 'sharingSvc',
        function ($scope, $routeParams, sharingSvc) {
			// we get the language text
			$scope.text = language.getText();
        	// used if there is no selected product and have to check witch is with this ID
        	function getProduct(products) {
        		var id = $routeParams.id;
        		for(var colCounter = 0; colCounter < products.length; colCounter++) {
        			for(var prodCounter = 0; prodCounter < products[colCounter].length; prodCounter++) {
        				var product = products[colCounter][prodCounter];
        				if(product._id === id){
        					$scope.product = product;
							$scope.product.difference = parseFloat(product.newPrice) - parseFloat(product.oldPrice);
        				}
        			}
        		}
        	}
        	var product = sharingSvc.getProductToView(getProduct);
        	if(product !== undefined) {
        		$scope.product = product;
				$scope.product.difference = parseFloat(product.newPrice) - parseFloat(product.oldPrice);
        	}
        	$scope.config = config;
            // we timestamp the images to remove chaching
            $scope.time = Math.floor(Date.now() / 1000);
		}]);
