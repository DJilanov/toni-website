'use strict';

angular.module('Header')
    .controller('HeaderCtrl', ['$scope', '$location', 'sharingSvc', '$filter',
        function ($scope, $location, sharingSvc, $filter) {
            // TODO integrate search functionallity into the database. When you type here it calls to
            // the database and show result as bootstrap search suggestions
            $scope.searchInput = null;
            // here we integrate the navigation items
            $scope.navigationItems = [];
            // here we integrate language
        	$scope.texts = language.getText();
        	// here we set the default language
        	$scope.language = config.defaultLang;
			// here we set the config so we can use it at scope
			$scope.config = config;
            // we set the active page to be shown in the header as black background
            $scope.isActive = function (viewLocation) {
		        return viewLocation === $location.path();
		    };
			$scope.selected = $scope.texts.headerSearchFor;
			$scope.products = [];
			$scope.flagSrc = 'img/flag-' + language.getLang() + '.png';
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
							$scope.navigationItems[navItem['zIndex']].name = navItem.info[language.getLang()].name;
							$scope.navigationItems[navItem['zIndex']].title = navItem.info[language.getLang()].title;
				        }
				    }
				}

        	};
			$scope.findProduct = function(keyword) {
				return $filter('filter')($scope.products , {'$': keyword});
			};
        	// we call the ajax
			sharingSvc.getProducts($scope.setNavigationitems);
			// activated when click on flag. Changes language
			$scope.changeLanguage = function() {
				var lang = language.getLang();
				if(config.langs.indexOf(lang) < config.langs.length - 1) {
					language.setLanguage(config.langs[config.langs.indexOf(lang) + 1]);
				} else {
					language.setLanguage(config.langs[0]);
				}
				lang = language.getLang();
				$scope.flagSrc = 'img/flag-' + lang + '.png';
        		$scope.texts = language.getText();
				for(var naviCounter = 0; naviCounter < $scope.navigationItems.length; naviCounter++) {
					if($scope.navigationItems[naviCounter] !== undefined) {
						$scope.navigationItems[naviCounter].name = $scope.navigationItems[naviCounter].info[lang].name;
						$scope.navigationItems[naviCounter].title = $scope.navigationItems[naviCounter].info[lang].title;
					}
				}
			};
			// activated when you click on product form the search input
			$scope.search = function(item, model, label) {
				sharingSvc.viewProduct(item);
				$location.path( "/view/" + item.link);
			};
			// clear all elements in the search toolbox
			$scope.clearSearch = function() {
				$scope.selected = '';
			};
			// TODO: Integrate when you click on shop by department it must be pull down menu and you have
			// the choise between the product creators ( samsung , nokia and etc )

		}]);
