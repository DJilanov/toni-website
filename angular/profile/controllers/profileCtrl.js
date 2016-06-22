'use strict';

angular.module('Profile')
    .controller('ProfileCtrl', ['$scope', '$location', '$http', '$rootScope', 'sharingSvc',
        function($scope, $location, $http, $rootScope, sharingSvc) {
            // here we integrate language
            $scope.text = language.getText();
            // we set the page title
            $rootScope.pageTitle = $scope.text.profilePageTitle;
            // the flag for witch tab we have open
            $scope.tab = 'profile';
            // used just to see JSON structure
            // $scope.user = {
            //     "email": "",
            //     "password": "",
            //     "username": "",
            //     "address": "",
            //     "orders": [{
            //         "amount": 1,
            //         "id": "",
            //         "recieved": true
            //     }],
            //     "messages": [{
            //         "date": "19234657",
            //         "message": "test1"
            //     }]
            // };

            $scope.user = sharingSvc.getUser();
            if($scope.user.email == undefined) {
                $scope.user = JSON.parse(localStorage.getItem('user'));
            }

            // add event listeners on the navigation items
            $scope.profile = function(e) {
                if($scope.tab !== 'profile') {
                    $scope.tab = 'profile';
                    changeActive(0);
                }
            };
            $scope.message = function(e) {
                if($scope.tab !== 'message') {
                    $scope.tab = 'message';
                    changeActive(1);
                }
            };
            $scope.order = function(e) {
                if($scope.tab !== 'order') {
                    $scope.tab = 'order';
                    changeActive(2);
                }
            };

            function changeActive(position) {
                var liArray = $('#profile-navi li');
                for(var liCounter = 0; liCounter < liArray.length; liCounter++) {
                    liArray[liCounter].className = "";
                }
                liArray[position].className = "active";
            }

            // imitate the olx user profile
        }
    ]);
