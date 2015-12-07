'use strict';

angular.module('Header')
    .controller('HeaderCtrl', ['$scope', '$location', 'sharingSvc', '$filter',
        function ($scope, $location, sharingSvc, $filter) {
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
			$scope.selected = 'Search for...';
			$scope.products = [];
			//------------------------------------------------------
			// here we import the nav items
        	$scope.setNavigationitems = function(products, categories){
				for(var categoryCounter = 0; categoryCounter < products.length; categoryCounter++) {
					for(var productCounter = 0; productCounter < products[categoryCounter].length; productCounter++) {
						$scope.products.push(products[categoryCounter][productCounter]);
					}
				}
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
			$scope.findProduct = function(keyword) {
				return $filter('filter')($scope.products , {'$': keyword});
			};
        	// we call the ajax
			sharingSvc.getProducts($scope.setNavigationitems);

			$scope.changeLanguage = function() {
			    debugger;
			    // TODO: Integrate translation using the translation JSON. It can be done by spliting the info.
			    // Need to check out how to broadcast translating event.
			};

			$scope.search = function(item, model, label) {
				sharingSvc.viewProduct(item);
				$location.path( "/view/" + item._id);
			};
			$scope.clearSearch = function() {
				$scope.selected = '';
			};
			// TODO: Integrate when you click on shop by department it must be pull down menu and you have
			// the choise between the product creators ( samsung , nokia and etc )

		}]);
