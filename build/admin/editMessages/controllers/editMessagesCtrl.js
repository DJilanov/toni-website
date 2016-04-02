'use strict';

angular.module('EditMessages')
    .controller('EditMessagesCtrl', ['$scope',  'sharingSvc',
        function ($scope,  sharingSvc) {
            // will contain the messages
            $scope.messages = [];
            // get the messages
            $scope.getMessages = function(products, categories, messages) {
                for(var messagesCounter = messages.length - 1; messagesCounter >= 0; messagesCounter--) {
                    $scope.messages.push(messages[messagesCounter]);
                }
            };
            // delete message
            $scope.delete = function(message) {
                var form = { "form": message };
                form.type = message.type;
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
            sharingSvc.getProducts($scope.getMessages);
		}]);
