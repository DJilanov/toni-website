/**
 * Created by Dimitar_Jilanov on 2/2/2016.
 */
'use strict';

angular.module('Cart')
    .controller('CartCtrl', ['$scope', 'sharingSvc', '$location', '$rootScope',
        function ($scope, sharingSvc, $location, $rootScope) {
            // we get the language text
            $scope.text = language.getText();
            // we set the page title
            $rootScope.pageTitle = $scope.text.cartPageTitle;
            // we set the config so it can be usable in the screen
            $scope.config = config;
            // we set the vault
            $scope.vault = config.vaults[config.langs.indexOf(language.getLang())];
            // we set the products array
            $scope.products = [];
            // is the cart empty
            $scope.emptyCart = false;
            // total price
            $scope.totalPrice = 0;
            // used if there is no selected product and have to check witch is with this ID
            if((localStorage.getItem('cart'))&&(localStorage.getItem('cart').length > 3)) {
                $scope.products = JSON.parse(localStorage.getItem('cart'));
                calculateTotalPrice();
            } else {
                $scope.emptyCart = true;
            }

            // we view the product
            $scope.onProductClick = function(product) {
                sharingSvc.viewProduct(product);
                $location.path( "/view/" + product.link);
            };
            // we view the product
            $scope.removeFromCart = function(product) {
                var timestamp = Date.parse(product.date);
                for(var productCounter = 0; productCounter < $scope.products.length; productCounter++) {
                    if(timestamp === Date.parse($scope.products[productCounter].date)) {
                        $scope.products.splice(productCounter, 1);
                        localStorage.setItem('cart', JSON.stringify($scope.products));
                        alert($scope.text.removeFromCartSuccess);
                    }
                }
                if($scope.products.length === 0) {
                    $scope.emptyCart = true;
                }
                calculateTotalPrice();
            };
            // calculate total price
            function calculateTotalPrice() {
                $scope.totalPrice = 0;
                for(var productCounter = 0; productCounter < $scope.products.length; productCounter++) {
                    $scope.totalPrice += $scope.products[productCounter].total;
                }
            };
        }]);
