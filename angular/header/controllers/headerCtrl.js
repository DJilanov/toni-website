'use strict';

angular.module('Header')
    .controller('HeaderCtrl', ['$scope', '$location', 'sharingSvc',
        function ($scope, $location, sharingSvc) {
            // TODO integrate search functionallity into the database. When you type here it calls to
            // the database and show result as bootstrap search suggestions
            $scope.searchInput = null;
            // here we integrate the navigation items
            $scope.navigationItems = [];
        	$scope.texts = language.getText();
            // we set the active page to be shown in the header as black background
            $scope.isActive = function (viewLocation) {
		        return viewLocation === $location.path();
		    };
			//------------------------------------------------------
			// here we import the nav items
        	$scope.setNavigationitems = function(products, categories){
	        	for (var key in categories) {
				    if (categories.hasOwnProperty(key)) {
				        var navItem = categories[key];
				        // important check that this is objects own property
				        // not from prototype prop inherited
				        if(typeof navItem !== "string"){
				           $scope.navigationItems[navItem['zIndex']] = navItem;
				           $scope.navigationItems[navItem['zIndex']].link = key;
				        }
				    }
				}
        	};
        	// we call the ajax
			sharingSvc.getProducts($scope.setNavigationitems);

			//------------------------------------------------------

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

		}]);
