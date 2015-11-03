'use strict';

angular.module('EditCarousel')
    .controller('EditCarouselCtrl', ['$scope',  'sharingSvc',
        function ($scope,  sharingSvc) {

            // here we integrate the navigation items
            $scope.carouselImages = [];
            // the name of the user
            $scope.name = config.name;
        	var location = config.carousel;
			//------------------------------------------------------
			// here we import the nav items
        	$scope.setCarouselImages = function(products, categories, carousel){
	        	for (var key in carousel) {
				    if (carousel.hasOwnProperty(key)) {
				        var navItem = carousel[key];
				        // important check that this is objects own property
				        // not from prototype prop inherited
				        if(typeof navItem !== "string"){
				           $scope.carouselImages[navItem['zIndex']] = navItem;
				        }
				    }
				}
        	};
        	// here we get the callback after call to the server is compleate
        	$scope.onSave = function() {
        		// TODO: Show succesfully updated message
            	alert('Saved');
        	};
        	// here we set the update new carousel image
        	$scope.changeImage = function(item) {
        		debugger;
        	};
        	// here we save the carousel item
        	$scope.save = function(carouselItem) {
				sharingSvc.save($scope.onSave, carouselItem);
        	};
        	// here we upload image on click of the image
        	$scope.upload = function(file, id) {
        		var element = checkForItem(id);
        		// add image
        	}
        	function checkForItem(id) {
        		for(var counter = 0; counter < $scope.carouselImages.length; counter++) {
        			if($scope.carouselImages[counter].id === id){
        				return $scope.carouselImages[counter];
        			}
        		}
        		return false;
        	}
        	// we call the ajax
			sharingSvc.getProducts($scope.setCarouselImages);
		}]);
