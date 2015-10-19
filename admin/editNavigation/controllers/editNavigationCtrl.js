'use strict';

angular.module('EditNavigation')
    .controller('EditNavigationCtrl', ['$scope',  'sharingSvc',
        function ($scope,  sharingSvc) {

            // here we integrate the navigation items
            $scope.navigationItems = [];
            // WARNING: We doesnt need add function here.
            // When you add new category you automaticly have a navigation bar
            $scope.add = function() {
            	var clonedPrototype = JSON.parse(JSON.stringify(config.categoryPrototype));
            	clonedPrototype.new = true;
            	$scope.navigationItems[$scope.navigationItems.length] = clonedPrototype;

            };
            // when you click save button of a navbar you save it here
            $scope.save = function() {
            	sharingSvc.save();
            };
            // the callback after the product is saved
            $scope.onSave = function() {
            	alert('Saved');
            };
			// here we import the nav items
        	$scope.setNavigationitems = function(products, categories) {
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
