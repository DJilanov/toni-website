'use strict';

angular.module('Carousel', ['ui.bootstrap'])
    .controller('CarouselCtrl', ['$scope', 'sharingSvc',
        function ($scope, sharingSvc) {
            $scope.myInterval = 3000;
			$scope.slides = [];
			// here we set the items into the carousel
			$scope.setCarouselItems = function(products, categories, carousel) {
				$scope.slides = carousel;
			};
        	// we call the ajax
			sharingSvc.getProducts($scope.setCarouselItems);
		}]);
