'use strict';

angular.module('EditProduct')
    .controller('EditProductCtrl', ['$scope', '$location', 'sharingSvc',
        function ($scope, $location, sharingSvc) {
			$scope.product = sharingSvc.getProductToView();
			$scope.input = {};
			$scope.onSave = function(){

			};
		}]);
