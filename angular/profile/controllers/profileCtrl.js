'use strict';

angular.module('Profile')
    .controller('ProfileCtrl', ['$scope', '$location', '$http', 'sharingSvc',
        function($scope, $location, $http, sharingSvc) {

            $scope.user = {
                "username": "",
                "password": "",
                "email": "",
                "address": "",
                "orders": [{
                    "amount": 1,
                    "id": "",
                    "recieved": true
                }],
                "messages": [{
                    "from": "5704cb1fe4b0f62792ad7076",
                    "message": "test1"
                }]
            };

            function getUserDetails(userDetails) {
                $scope.user = userDetails;
            }

            // imitate the olx user profile
            // the navi is based on Orders | Messages | Recieved Orders | Edit profile info. Under them there is search box for all
        }
    ]);
