'use strict';

angular.module('Contacts')
    .controller('ContactsCtrl', ['$scope', 'sharingSvc', '$location', '$templateCache',
        function ($scope, sharingSvc, $location, $templateCache) {
        	$scope.text = language.getText();
            (function() {
			// Create a map object and specify the DOM element for display.
				var myCoords = {lat: 42.649853515390795, lng: 23.356552720069885};
				var map = new google.maps.Map(document.getElementById('map'), {
				    center: myCoords,
				    scrollwheel: true,
				    pointer: true,
				    zoom: 15
			  	});
			  	var contentString = $templateCache.get('mapTemplate.html');
			  	contentString = contentString.replace('{{helloMessage}}', $scope.text.contactMarker).replace('{{address}}', $scope.text.contactAddress);
				var infowindow = new google.maps.InfoWindow({
				    content: contentString
				});

			  	var marker = new google.maps.Marker({
				    position: myCoords,
				    map: map,
				    title: $scope.text.contactMarker
				});
				infowindow.open(map, marker);
			})();

        	// we set the products in variable to be shown on screen
        	$scope.setContacts = function(products) {
        		// products = $scope.sortProductsByDailyOffer(products);
        		// // we set the sorted products into the products tab
        		// $scope.products = $scope.sortProductsByZIndex(products);
        	};


			sharingSvc.getProducts($scope.setContacts);
		}]);
