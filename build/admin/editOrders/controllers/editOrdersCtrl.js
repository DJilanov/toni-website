'use strict';

angular.module('EditOrders')
    .controller('EditOrdersCtrl', ['$scope',  'sharingSvc',
        function ($scope,  sharingSvc) {
            // will contain the messages
            $scope.orders = [];
            // get the messages
            $scope.getOrders = function(products, categories, messages, orders) {
                for(var ordersCounter = orders.length - 1; ordersCounter >= 0; ordersCounter--) {
                    orders[ordersCounter].clientOrders = JSON.parse(orders[ordersCounter].clientOrders);
                }
                // needs refactor
                for(var ordersCounter = 0; ordersCounter < orders.length; ordersCounter++) {
                    for(var clientOrdersCounter = 0; clientOrdersCounter < orders[ordersCounter].clientOrders.length; clientOrdersCounter++) {
                        for(var categoriesCounter = 0; categoriesCounter < products.length; categoriesCounter++) {
                            for(var productsCounter = 0; productsCounter < products[categoriesCounter].length; productsCounter++) {
                                if(products[categoriesCounter][productsCounter]._id === orders[ordersCounter].clientOrders[clientOrdersCounter].id) {
                                    orders[ordersCounter].clientOrders[clientOrdersCounter].product = products[categoriesCounter][productsCounter];
                                }
                            }
                        }
                    }
                }
                $scope.orders = orders;
            };
            // delete message
            $scope.delete = function(order) {
                var form = order;
                form.type = order.type;
                form.delete = "true";
                sharingSvc.save($scope.onSave, form);
            };
            // here we get the callback after call to the server is compleate
            $scope.onSave = function(data) {
                // TODO: Show succesfully updated message
                if(data.error) {
                    alert(data.error);
                } else {
                    // we check witch element is updated
                    alert(config.success);
                }

            };
            // fetch the products
            sharingSvc.getProducts($scope.getOrders);
        }]);
