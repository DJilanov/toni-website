'use strict';

angular.module('View')
    .controller('ViewCtrl', ['$scope', '$location', 'sharingSvc',
        function ($scope, $location, sharingSvc) {
			$scope.product = sharingSvc.getProductToView();
        	$scope.config = config;
		}]);
