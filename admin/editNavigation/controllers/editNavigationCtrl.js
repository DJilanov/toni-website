'use strict';

angular.module('EditNavigation')
    .controller('EditNavigationCtrl', ['$scope',  'sharingSvc',
        function ($scope,  sharingSvc) {
        	/*
			 * @info: used to contain the collection of navigation items
        	 */
            $scope.navigationItems = [];
        	/*
			 * @info: used to controll how many tabs can be open
        	 */
        	$scope.oneAtATime = config.oneAtATime;
        	/*
			 * @info: add new navigation item to the form
        	 */
            $scope.add = function() {
            	var clonedPrototype = JSON.parse(JSON.stringify(config.categoryPrototype));
            	clonedPrototype.new = true;
            	$scope.navigationItems[$scope.navigationItems.length] = clonedPrototype;

            };
        	/*
			 * @info: when you click save button of a navbar you save it here
        	 */
            $scope.save = function(naviItem) {
            	sharingSvc.save($scope.onSave, naviItem);
            };
        	/*
			 * @info: the callback after the naviItem is saved
			 * @naviItem: This is the item that we want to save
        	 */
            $scope.onSave = function() {
        		// TODO: Show succesfully updated message
            	alert('Saved');
            };
        	/*
			 * @info: here we import the nav items
        	 */
        	$scope.setNavigationitems = function(products, categories) {
	        	for (var naviCounter = 0; naviCounter < categories.length; naviCounter++) {
			        var navItem = categories[naviCounter];
			        // important check that this is objects own property
			        // not from prototype prop inherited
			        if(typeof navItem !== "string"){
			            $scope.navigationItems[navItem['zIndex']] = navItem;
			            $scope.navigationItems[navItem['zIndex']].link = naviCounter;
			        }
				}
        	};
        	/*
			 * @info: we call the ajax
        	 */
			sharingSvc.getProducts($scope.setNavigationitems);
		}]);
