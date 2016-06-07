'use strict';

angular.module('Login')
    .controller('LoginCtrl', ['$scope', '$location', '$http', 'sharingSvc', 'vcRecaptchaService',
        function($scope, $location, $http, sharingSvc, vcRecaptchaService) {
            // used for the login part
            $scope.login = {
                email: '',
                password: '',
                remember: false
            };

            // used for the register part
            $scope.register = {
                email: '',
                password: '',
                repeatedPassword: '',
                address: '',
                email: ''
            };

            // used to recognise witch state is currently active by the adress ( we use controller and the view on both login and register)
            if ($location.$$path === '/login') {
                $scope.isLogin = true;
            } else {
                $scope.isLogin = false;
            }
            // used when you want to go to register
            $scope.goToRegister = function() {
                // swap the page to register view
                $location.path('/register');
            };

            // used when you send log in
            $scope.logon = function() {
                if (vcRecaptchaService.getResponse() === "") { //if string is empty
                    alert("Please resolve the captcha and submit!")
                } else {
                    // TODO: make it break if the captcha is empty
                    if ($scope.login.remember == true) {
                        // TODO: Set token to the localstorage based witch we will know does the user loged in.
                    }
                    // set after login to move you to your profile
                    sharingSvc.login($scope.login);
                }
            };

            // used when you send register
            $scope.regon = function() {
                if ($scope.register.password !== $scope.register.repeatedPassword) {
                    alert('Wrong repeated password');
                    $scope.register.password = "";
                    $scope.register.repeatedPassword = "";
                } else {
                    // set after login to move you to your profile
                    sharingSvc.register($scope.register);
                }
            };
        }
    ]);
