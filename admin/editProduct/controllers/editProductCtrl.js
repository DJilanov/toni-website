'use strict';

angular.module('EditProduct')
    .controller('EditProductCtrl', ['$scope', '$location', 'sharingSvc',
        function ($scope, $location, sharingSvc) {
        	$scope.products = null;
        	$scope.categories = null;
        	var location = config.products;

        	$scope.getProducts = function(products, categories) {
        		$scope.products = products;
        		$scope.categories = categories;
        	};
        	$scope.onSave = function(result) {

        	};
			$scope.save = function(product) {
				sharingSvc.save($scope.onSave, product, location);
			};
			sharingSvc.getProducts($scope.getProducts);
		}]);
