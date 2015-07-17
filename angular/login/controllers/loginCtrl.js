'use strict';

angular.module('Login')
    .controller('LoginCtrl', ['$scope', '$location',
        function ($scope, $location) {

            $scope.isEditMode = false;

            // TODO refactor this
            $scope.isActive = function (viewLocation) {
                return viewLocation === $location.path();
            };
		}]);
