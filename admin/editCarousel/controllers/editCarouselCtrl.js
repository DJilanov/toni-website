'use strict';

angular.module('EditCarousel')
    .controller('EditCarouselCtrl', ['$scope',  'sharingSvc',
        function ($scope,  sharingSvc) {

            // here we integrate the navigation items
            $scope.carouselImages = [];
			//------------------------------------------------------
			// here we import the nav items
        	$scope.setCarouselImages = function(products, categories, carousel){
	        	for (var key in carousel) {
				    if (carousel.hasOwnProperty(key)) {
				        var navItem = carousel[key];
				        // important check that this is objects own property
				        // not from prototype prop inherited
				        if(typeof navItem !== "string"){
				           $scope.carouselImages[navItem['z-index']] = navItem;
				           var updatedUrl = navItem.url.replace('./', './../');
				           $scope.carouselImages[navItem['z-index']].url = updatedUrl;
				        }
				    }
				}
        	};
        	// here we set the update new carousel image
        	$scope.changeImage = function(item) {
        		debugger;
        	};
        	// here we save the carousel item
        	$scope.save = function(item) {
        		debugger;
        	};
        	// we call the ajax
			sharingSvc.getProducts($scope.setCarouselImages);
		}]);
