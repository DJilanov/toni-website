'use strict';

angular.module('EditCarousel')
    .controller('EditCarouselCtrl', ['$scope', '$route',  'sharingSvc',
        function ($scope, $route,  sharingSvc) {

            // here we integrate the navigation items
            $scope.carouselImages = [];
            // the name of the user
            $scope.name = config.name;
            // image array
            $scope.imageArray = [];
			//------------------------------------------------------
			// here we import the nav items
        	$scope.setCarouselImages = function(products, categories, carousel){
				$scope.carouselImages = carousel;
				for(var carouselCounter = 0; carouselCounter < carousel.length; carouselCounter++) {
					$scope.imageArray[carouselCounter] = {};
					$scope.imageArray[carouselCounter].url = './../img/'+ config.smallImage + carousel[carouselCounter].id + '.png';
				}
        	};
        	// here we get the callback after call to the server is compleate
        	$scope.onSave = function(data) {
        		// TODO: Show succesfully updated message
        		if(data.error) {
        			alert(data.error);
        		} else {
        			// we check witch element is updated
        			alert(config.success);
        		}

        	};
        	// here we save the carousel item
        	$scope.save = function(carouselItem) {
				sharingSvc.save($scope.onSave, carouselItem);
        	};
        	// here we upload image on click of the image
        	$scope.upload = function(file, id) {
        		if(file[0].type.indexOf('image') > -1){
	        		var element = checkForItem(id);
	        		element.changedImage = true;
	        		element.attachedImage = file[0];
        		} else {
        			alert('Its not image!');
        		}
        	};
        	// here we check for each item
        	function checkForItem(id) {
        		for(var counter = 0; counter < $scope.carouselImages.length; counter++) {
        			if(($scope.carouselImages[counter] !== undefined)&&($scope.carouselImages[counter].id === id)){
        				return $scope.carouselImages[counter];
        			}
        		}
        		return false;
        	}
        	// we call the ajax
			sharingSvc.getProducts($scope.setCarouselImages);
		}]);
