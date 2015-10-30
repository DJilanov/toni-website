'use strict';

angular.module('EditCategory')
    .controller('EditCategoryCtrl', ['$scope',  'sharingSvc',
        function ($scope,  sharingSvc) {
        	$scope.categories = [];

        	/*
        	 * @info: we set the categorys so we can show them to screen
			 */
        	$scope.getCategories = function(products, categories, carousel) {
        		for(var key in categories) {
        			if(typeof categories[key] !== 'string') {
        				$scope.categories[$scope.categories.length] = categories[key];
        			}

        		}
        	};
        	/*
        	 * @info: when we click on element from the categories list we show the inner list (that is currently hidden) whitch contains the products
			 * @index: This is the index of the element in the categories list
			 */
        	$scope.onSave = function(result) {
        		// TODO: Show succesfully updated message
            	alert('Saved');
        	};
        	/*
        	 * @info: used when we save a category. This calls the service and sends post request with the product
			 * @category: This is the category that we want to save
			 */
			$scope.save = function(category) {
				sharingSvc.save($scope.onSave, category);
			};
        	/*
        	 * @info: used when we save a category. This calls the service and sends post request with the product
			 * @category: This is the category that we want to save
			 */
			$scope.delete = function(category) {
				category.delete = true;
				sharingSvc.save($scope.onSave, category);
			};
        	/*
        	 * @info: used when we want to add category
			 * @category: This is the category in what we want to add the category
			 */
			$scope.add = function(category) {
				var products = $scope.products[category];
				products[products.length] = config.productPrototype;
				products[products.length - 1].category = category;
				products[products.length - 1].new = true;
			};
			sharingSvc.getProducts($scope.getCategories);
		}]);
