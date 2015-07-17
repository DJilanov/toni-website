'use strict';

angular.module('Header')
    .controller('HeaderCtrl', ['$scope', '$location', '$timeout',
        function ($scope, $location, $timeout) {
            // TODO integrate search functionallity into the database. When you type here it calls to
            // the database and show result as bootstrap search suggestions
            $scope.searchInput = null;
            $scope.carousel = $('.carousel').carousel();
            // we set the active page to be shown in the header as black background
            $scope.getClass = function(path) {
	        	var location = $location.$$path.indexOf(path);
	        	if(location > 0){
	        		return 'active';
	        	}
			};

			$scope.changeLanguage = function() {
			    debugger;
			    // TODO: Integrate translation using the translation JSON. It can be done by spliting the info.
			    // Need to check out how to broadcast translating event.
			};

			$scope.searchInputChange = function() {
				debugger;
			    // TODO: Integrate Search functionallity. When you type it waits 1 sec and then sends string
			    // for search into the back end. It must update and show bootstrap suggestions when you type
			    // when you click on suggestion it opens it on view mode
			};

			$scope.search = function() {
				debugger;
			    // TODO: Integrate Search functionallity. When you click the button it sends the string and if the
			    // response is only 1 camera it auto opens it on view mode. if there are more response it shows product list
			    // containing them
			};
			// TODO: Integrate when you click on shop by department it must be pull down menu and you have
			// the choise between the product creators ( samsung , nokia and etc )

			// carousel function
			// TODO: Integrate function that starts the carousel on load and fix the issues with the 2 buttons
			$scope.previousElement = function() {
				debugger;
				$('.carousel').carousel().prev();
			};

			$scope.nextElement = function() {
				debugger;
				$('.carousel').carousel().next();
			};

		}]);
