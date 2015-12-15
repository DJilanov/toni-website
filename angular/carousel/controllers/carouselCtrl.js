'use strict';

angular.module('Carousel', ['ui.bootstrap', 'ngAnimate'])
    .controller('CarouselCtrl', ['$scope', 'sharingSvc',
        function ($scope, sharingSvc) {
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
			// here we set the items into the carousel
			$scope.setCarouselItems = function(products, categories) {
				$scope.slides = [];
				for(var categoryCounter = 0; categoryCounter < products.length; categoryCounter ++) {
					for (var productCounter = 0; productCounter < products[categoryCounter].length; productCounter++) {
						if (products[categoryCounter][productCounter].carousel) {
							$scope.slides.push(products[categoryCounter][productCounter])
						}
					}
				}
			};
        	// we call the ajax
			sharingSvc.getProducts($scope.setCarouselItems);
            // we timestamp the images to remove chaching
            $scope.time = Math.floor(Date.now() / 1000);
		}]);
