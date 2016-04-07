'use strict';

angular.module('Login')
    .controller('LoginCtrl', ['$scope', '$location', '$http', 'sharingSvc',
        function ($scope, $location, $http, sharingSvc) {

          // used for the login part
          $scope.login = {
            username: '',
            password: '',
            remember: false
          };

          // used for the register part
          $scope.register = {
            username: '',
            password: '',
            repeatedPassword: '',
            address: '',
            email: ''
          };

          // used to recognise witch state is currently active by the adress ( we use controller and the view on both login and register)
          if($location.url === 'login') {
            $scope.login = true;
          } else {
            $scope.login = false;
          }
          // used when you want to go to register
          $scope.goToRegister = function() {
            // swap the page to register view
            $location.path('/register');
          };

          // used when you send log in
          $scope.logon = function(login) {
              // set after login to move you to your profile
              sharingSvc.login(login);
          };

          // used when you send register
          $scope.regon = function(register) {
              if($scope.register.password !== $scope.register.repeatedPassword) {
                  alert('Wrong repeated password');
                  $scope.register.password = "";
                  $scope.register.repeatedPassword = "";
              } else {
                // set after login to move you to your profile
                sharingSvc.register($scope.register);
              }
          };
    }]);
