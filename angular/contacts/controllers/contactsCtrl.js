'use strict';

angular.module('Contacts')
    .controller('ContactsCtrl', ['$scope', 'sharingSvc', '$location', '$templateCache',
        function ($scope, sharingSvc, $location, $templateCache) {
        	$scope.text = language.getText();
			$scope.form = {};
            (function() {
			// Create a map object and specify the DOM element for display.
				var myCoords = {lat: 42.709923, lng: 23.379968};
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

        	$scope.submitForm = function() {
				debugger;
				var data = {form: $scope.form, response: grecaptcha.getResponse()}
				//todo: send them to backend and send the resposne to https://www.google.com/recaptcha/api/siteverify so you can check is it correct key
			};
		}]);
