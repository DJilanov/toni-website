'use strict';

angular.module('View')
    .controller('ViewCtrl', ['$scope', '$routeParams', 'sharingSvc',
        function ($scope, $routeParams, sharingSvc) {
			$scope.product = sharingSvc.getProductToView();
        	$scope.config = config;
		}]);
