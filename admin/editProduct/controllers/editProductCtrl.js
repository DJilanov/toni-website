'use strict';

angular.module('EditProduct')
    .controller('EditProductCtrl', ['$scope', 'sharingSvc',
        function ($scope, sharingSvc) {
        	/*
			 * @info: used to contain the collection of products
        	 */
        	$scope.products = null;
        	/*
			 * @info: used to controll how many products each category contain so we can show it as badge
        	 */
        	$scope.categorySize = [];
        	/*
			 * @info: used to contain the collection of categories
        	 */
        	$scope.categories = null;
        	/*
			 * @info: used to controll how many tabs can be open
        	 */
        	$scope.oneAtATime = config.oneAtATime;
        	/*
			 * @info: used to show the name of the administrator
        	 */
        	$scope.name = config.name;
        	/*
        	 * @info: this is the callback of the function that get us the products from the storage
			 * @products: This is the products collection
			 * @categories: This is the categories collection
			 */
        	$scope.getProducts = function(products, categories) {
        		$scope.products = products;
        		$scope.categories = categories;
        		for(var productsCounter = 0; productsCounter < products.length; productsCounter++) {
        			$scope.categorySize[productsCounter] = products[productsCounter].length;
        		}
        	};
        	/*
        	 * @info: when we click on element from the categories list we show the inner list (that is currently hidden) whitch contains the products
			 * @index: This is the index of the element in the categories list
			 */
        	$scope.onSave = function(result) {

        	};
        	/*
        	 * @info: used when we save a product. This calls the service and sends post request with the product
			 * @product: This is the product that we want to save
			 */
			$scope.save = function(product) {
				sharingSvc.save($scope.onSave, product, location);
			};
        	/*
        	 * @info: used when we save a product. This calls the service and sends post request with the product
			 * @product: This is the product that we want to save
			 */
			$scope.delete = function(product) {
				product.delete = true;
				sharingSvc.save($scope.onSave, product, location);
			};
        	/*
        	 * @info: used when we want to add product
			 * @category: This is the category in what we want to add the product
			 */
			$scope.add = function(category) {
				var products = $scope.products[category];
				products[products.length] = config.productPrototype;
				products[products.length - 1].category = category;
				products[products.length - 1].new = true;
			};
			// used to fetch the products and populate the page
			sharingSvc.getProducts($scope.getProducts);
		}]);
