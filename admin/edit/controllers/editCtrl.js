'use strict';

angular.module('Edit')
    .controller('EditCtrl', ['$scope', '$location', 'sharingSvc',
        function ($scope, $location, sharingSvc) {
			$scope.product = sharingSvc.getProductToView();
			$scope.input = {};
			$scope.onSave = function(){

			};
		}]);
