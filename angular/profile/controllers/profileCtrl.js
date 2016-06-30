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
            $scope.config = config;
            // used just to see JSON structure
            // $scope.user = {
            //     "email": "",
            //     "password": "",
            //     "other": "",
            //     "username": "",
            //     "address": "",
            // "orders": [{
            //     "amount": 1,
            //     "id": "564a0c51ffc0edc23e6258a0",
            //     "recieved": true
            // }],
            // "messages": [{
            //     "date": "19234657",
            //     "message": "test1"
            // }]
            // };

            $scope.user = sharingSvc.getUser();
            if ($scope.user.email == undefined) {
                $scope.user = JSON.parse(localStorage.getItem('user'));
            }
            $scope.orders = $scope.user.orders;
            if ($scope.orders !== undefined) {
                sharingSvc.getProducts(addOrders)
            }

            function addOrders(products) {
                for (var ordersCounter = 0; ordersCounter < $scope.orders.length; ordersCounter++) {
                    for (var categoryCounter = 0; categoryCounter < products.length; categoryCounter++) {
                        for (var productCounter = 0; productCounter < products[categoryCounter].length; productCounter++) {
                            if (products[categoryCounter][productCounter]._id === $scope.orders[ordersCounter].id) {
                                $scope.orders[ordersCounter].product = products[categoryCounter][productCounter];
                            }
                        }
                    }
                }
            }

            // add event listeners on the navigation items
            $scope.profile = function(e) {
                if ($scope.tab !== 'profile') {
                    $scope.tab = 'profile';
                    changeActive(0);
                }
            };
            $scope.message = function(e) {
                if ($scope.tab !== 'message') {
                    $scope.tab = 'message';
                    changeActive(1);
                }
            };
            $scope.order = function(e) {
                if ($scope.tab !== 'order') {
                    $scope.tab = 'order';
                    changeActive(2);
                }
            };

            function changeActive(position) {
                var liArray = $('#profile-navi li');
                for (var liCounter = 0; liCounter < liArray.length; liCounter++) {
                    liArray[liCounter].className = "";
                }
                liArray[position].className = "active";
            }

            $scope.saveChanges = function() {
                sharingSvc.saveUser($scope.user, function() {
                    var person = JSON.parse(localStorage.getItem('user'));
                    person.names = $scope.user.names;
                    person.phone = $scope.user.phone;
                    person.other = $scope.user.other;
                    person.address = $scope.user.address;
                    localStorage.setItem('user', JSON.stringify(person));
                });
            }

            $scope.signOut = function() {
                localStorage.setItem('user', JSON.stringify({}));
                $location.path('/login');
                $rootScope.$broadcast('signOut');
            }

            // imitate the olx user profile
        }
    ]);
