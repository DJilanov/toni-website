'use strict';

angular.module('Carousel')
    .controller('CarouselCtrl', ['$scope', 'sharingSvc', '$location',
        function ($scope, sharingSvc, $location) {
            $scope.myInterval = 3000;
            // we generate dummy object
			$scope.slides = [{
				id: "0",
				imageDescription: "imageTest",
				shownOnCarousel: "true",
				type: "carousel",
				url: "./img/proj1.png",
				zIndex: "0"
			}];
			$scope.setCarousel = function(slides) {
				slides = $scope.setCarouselItems(slides);
				slides = $scope.sortProductsByZIndex(slides);
				// we set the sorted products into the products tab
				$scope.slides = sortArray(slides);
			};
			// here we set the items into the carousel
			$scope.setCarouselItems = function(products, categories) {
				var slides = [];
				for(var categoryCounter = 0; categoryCounter < products.length; categoryCounter ++) {
					for (var productCounter = 0; productCounter < products[categoryCounter].length; productCounter++) {
						if (products[categoryCounter][productCounter].carousel) {
							products[categoryCounter][productCounter]['zIndex'] = parseInt(products[categoryCounter][productCounter]['zIndex']);
							slides.push(products[categoryCounter][productCounter])
						}
					}
				}
				return slides;
			};
			// used to sort products by theirs z index
			$scope.sortProductsByZIndex = function(slides) {
				var sortedProducts = [];
				var product = {};
				for(var productCounter = 0; productCounter < slides.length; productCounter++) {
					product = slides[productCounter];
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
			function sortArray(slides) {
				var sortedArray = [];
				for(var productCounter = 0; productCounter < slides.length; productCounter++) {
					if(slides[productCounter] !== undefined) {
						sortedArray.push(slides[productCounter]);
					}
				}
				return sortedArray;
			}
			// fetch the products
			sharingSvc.getProducts($scope.setCarousel);
			// we view the product
			$scope.onProductClick = function(product) {
				sharingSvc.viewProduct(product);
				$location.path( "/view/" + product._id);
			};
            // we timestamp the images to remove chaching
            $scope.time = Math.floor(Date.now() / 1000);
		}]);
