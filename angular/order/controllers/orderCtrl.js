/**
 * Created by Dimitar_Jilanov on 2/2/2016.
 */
'use strict';

angular.module('Order')
    .controller('OrderCtrl', ['$scope', 'sharingSvc', '$location', '$rootScope',
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
            // is the order empty
            $scope.emptyCart = false;
            // total price
            $scope.totalPrice = 0;
            // form object
            $scope.form = {};
            if (localStorage.getItem('user').length > 0) {
                var user = JSON.parse(localStorage.getItem('user'));
                if (user.email !== undefined) {
                    $scope.form.name = user.names;
                    $scope.form.email = user.email;
                    $scope.form.phone = user.phone;
                    $scope.form.name = user.address;
                };
            }
            // used if there is no selected product and have to check witch is with this ID
            if((localStorage.getItem('cart'))&&(localStorage.getItem('cart').length > 3)) {
                $scope.products = JSON.parse(localStorage.getItem('cart'));
                calculateTotalPrice();
            } else {
                $scope.emptyCart = true;
            }
            // we send the cart orders
            $scope.sendCart = function() {
                var orders = [];
                for(var productsCounter = 0; productsCounter < $scope.products.length; productsCounter++) {
                    var product = {};
                    product.amount = $scope.products[productsCounter].amount;
                    product.id = $scope.products[productsCounter].product._id;
                    product.total = $scope.products[productsCounter].product.total;
                    orders.push(product);
                }
                $scope.form.orders = JSON.stringify(orders);
                sharingSvc.sendOrderForm($scope.form);
            };


            // we view the product
            $scope.removeFromCart = function(product) {
                var timestamp = Date.parse(product.date);
                for(var productCounter = 0; productCounter < $scope.products.length; productCounter++) {
                    if(timestamp === Date.parse($scope.products[productCounter].date)) {
                        $scope.products.splice(productCounter, 1);
                        localStorage.setItem('order', JSON.stringify($scope.products));
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
            }
        }]);
