'use strict';

angular.module('EditNavigation')
    .controller('EditNavigationCtrl', ['$scope', '$location', 'sharingSvc',
        function ($scope, $location, sharingSvc) {

            // here we integrate the navigation items
            $scope.navigationItems = [];
            // we set the active page to be shown in the header as black background
            $scope.getClass = function(path) {
	        	var location = $location.$$path.indexOf(path);
	        	if(location > 0){
	        		return 'active';
	        	}
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
				           $scope.navigationItems[navItem['z-index']] = navItem;
				           $scope.navigationItems[navItem['z-index']].link = key;
				        }
				    }
				}
        	};
        	// we call the ajax
			sharingSvc.getProducts($scope.setNavigationitems);
		}]);
