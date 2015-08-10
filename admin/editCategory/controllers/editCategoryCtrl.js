'use strict';

angular.module('EditCategory')
    .controller('EditCategoryCtrl', ['$scope',  'sharingSvc',
        function ($scope,  sharingSvc) {
        	$scope.categories = [];

        	$scope.getCategories = function(products, categories, carousel) {
        		for(var key in categories) {
        			if(typeof categories[key] !== 'string') {
        				$scope.categories[$scope.categories.length] = categories[key];
        			}

        		}
        	};
			$scope.onSave = function(){

			};
			sharingSvc.getProducts($scope.getCategories);
		}]);
