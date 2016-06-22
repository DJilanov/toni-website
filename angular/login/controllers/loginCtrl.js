'use strict';

angular.module('Login')
    .controller('LoginCtrl', ['$scope', '$location', '$http', '$rootScope', 'sharingSvc', 'vcRecaptchaService',
        function($scope, $location, $http, $rootScope, sharingSvc, vcRecaptchaService) {
            $scope.text = language.getText();
            // we set the page title
            $rootScope.pageTitle = $scope.text.loginPageTitle;
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
            };

            $scope.gRecaptchaResponse = '';

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
                if ($scope.gRecaptchaResponse === "") { //if string is empty
                    alert($scope.text.resolveCaptcha)
                } else {
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
                    alert($scope.text.errorDifferentPasswords);
                    $scope.register.password = "";
                    $scope.register.repeatedPassword = "";
                } else {
                    // if ($scope.gRecaptchaResponse === "") { //if string is empty
                    //     alert($scope.text.resolveCaptcha);
                    // } else {
                        sharingSvc.register($scope.register);
                    // }
                }
            };
        }
    ]);
