'use strict';

angular.module('View')
    .controller('ViewCtrl', ['$scope', '$routeParams', 'sharingSvc',
        function ($scope, $routeParams, sharingSvc) {
        	// used if there is no selected product and have to check witch is with this ID
        	function getProduct(products) {
        		var id = $routeParams.id;
        		for(var colCounter = 0; colCounter < products.length; colCounter++) {
        			for(var prodCounter = 0; prodCounter < products[colCounter].length; prodCounter++) {
        				var product = products[colCounter][prodCounter];
        				if(product.id === id){
        					$scope.product = product;
        				}
        			}
        		}
        	}
        	var product = sharingSvc.getProductToView(getProduct);
        	if(product !== undefined) {
        		$scope.product = product;
        	}
        	$scope.config = config;
		}]);
