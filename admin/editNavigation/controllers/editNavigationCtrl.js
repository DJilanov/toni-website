'use strict';

angular.module('EditNavigation')
    .controller('EditNavigationCtrl', ['$scope',  'sharingSvc',
        function ($scope,  sharingSvc) {

            // here we integrate the navigation items
            $scope.navigationItems = [];
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
		}]);
