'use strict';

angular.module('Profile')
    .controller('ProfileCtrl', ['$scope', '$location', '$http', 'sharingSvc',
        function($scope, $location, $http, sharingSvc) {

            $scope.user = {
                "email": "",
                "password": "",
                "username": "",
                "address": "",
                "orders": [{
                    "amount": 1,
                    "id": "",
                    "recieved": true
                }],
                "messages": [{
                    "date": "19234657",
                    "message": "test1"
                }]
            };

            $scope.user = sharingSvc.getUser();

            // imitate the olx user profile
        }
    ]);
