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
			 * @info: used to contain all new products
			 */
			$scope.newProductsArray = [];
        	/*
        	 * @info: this is the callback of the function that get us the products from the storage
			 * @products: This is the products collection
			 * @categories: This is the categories collection
			 */
        	$scope.getProducts = function(products, categories) {
        		$scope.products = products;
        		$scope.categories = $scope.sortCategories(categories);
        		for(var productsCounter = 0; productsCounter < products.length; productsCounter++) {
        			$scope.categorySize[productsCounter] = products[productsCounter].length;
        		}
				$scope.checkProducts(products);
        	};
			/*
			 * @info: used to sort categories based on products
			 */
			$scope.sortCategories = function(categories){
				//var sortedCategories = [];
				//var result = [];
				//for(var categoryCounter = 0; categoryCounter < categories.length; categoryCounter++) {
				//	sortedCategories[categories[categoryCounter].products] = categories[categoryCounter];
				//}
				//for(var categoryCounter = 0; categoryCounter < sortedCategories.length; categoryCounter++) {
				//	if(sortedCategories[categoryCounter] !== undefined) {
				//		result.push(sortedCategories[categoryCounter]);
				//	}
				//}
				//return result;
				return categories;
			};
        	/*
        	 * @info: when we click on element from the categories list we show the inner list (that is currently hidden) whitch contains the products
			 * @index: This is the index of the element in the categories list
			 */
        	$scope.onSave = function(data) {
        		// TODO: Show succesfully updated message
        		if(data.error) {
        			alert(data.error);
        		} else {
        			// we check witch element is updated
        			alert(config.success);
        		}
        	};
			/*
			* @info Fix the problem with the string based boolean elements
			*/
			$scope.checkProducts = function(products) {
				for(var categoryCounter = 0; categoryCounter < products.length; categoryCounter++) {
					for(var productCounter = 0; productCounter < products[categoryCounter].length; productCounter++) {
						products[categoryCounter][productCounter].isNew = JSON.parse(products[categoryCounter][productCounter].isNew);
						products[categoryCounter][productCounter].dailyOffer = JSON.parse(products[categoryCounter][productCounter].dailyOffer);
					}
				}
			};
        	/*
        	 * @info: used when we save a product. This calls the service and sends post request with the product
			 * @product: This is the product that we want to save
			 */
			$scope.save = function(product) {
				sharingSvc.save($scope.onSave, product);
			};
        	/*
        	 * @info: used when we save a product. This calls the service and sends post request with the product
			 * @product: This is the product that we want to save
			 */
			$scope.delete = function(product) {
				product.delete = true;
				sharingSvc.save($scope.onSave, product);
			};
        	/*
        	 * @info: used when we want to add product
			 * @category: This is the category in what we want to add the product
			 */
			$scope.add = function(category) {
				var products = $scope.products[category];
				products[products.length] = JSON.parse(JSON.stringify(config.productPrototype));
				products[products.length - 1].category = category;
				products[products.length - 1].new = true
				products[products.length - 1].newId = $scope.newProductsArray.length;
				$scope.newProductsArray.push(products[products.length - 1]);
			};
        	/*
        	 * @info: used when we want to update image
			 * @file: This is the image that we updated
			 * @id: This is the id of the product we set the image to
			 */
        	$scope.upload = function(file, id, newId) {
        		if(file[0].type.indexOf('image') > -1){
	        		var element = checkForItem(id, newId);
	        		element.changedImage = true;
	        		element.attachedImage = file[0];
        		} else {
        			alert('Its not image!');
        		}
        	};
        	/*
        	 * @info: here we check for each item
			 * @id: This is the id of the product we set the image to
			 */
        	function checkForItem(id, newId) {
				if(id == "") {
					return $scope.newProductsArray[newId];
				}
        		for(var counter = 0; counter < $scope.products.length; counter++) {
        			for(var innerCounter = 0; innerCounter < $scope.products[counter].length; innerCounter++) {
	        			if(($scope.products[counter][innerCounter] !== undefined)&&($scope.products[counter][innerCounter]._id === id)){
	        				return $scope.products[counter][innerCounter];
	        			}
	        		}
        		}
        		return false;
        	}
			// used to fetch the products and populate the page
			sharingSvc.getProducts($scope.getProducts);
		}]);
