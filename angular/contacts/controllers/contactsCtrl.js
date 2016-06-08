'use strict';

angular.module('Contacts')
    .controller('ContactsCtrl', ['$scope', 'sharingSvc', '$location', '$templateCache', '$rootScope', 'vcRecaptchaService',
        function($scope, sharingSvc, $location, $templateCache, $rootScope, vcRecaptchaService) {
            $scope.text = language.getText();
            // we set the page title
            $rootScope.pageTitle = $scope.text.contactPageTitle;
            $scope.form = {};
            $scope.gRecaptchaResponse = '';
            (function() {
                // Create a map object and specify the DOM element for display.
                var myCoords = { lat: 42.711330, lng: 23.375995 };
                if (google) {
                    var map = new google.maps.Map(document.getElementById('map'), {
                        center: myCoords,
                        scrollwheel: true,
                        pointer: true,
                        zoom: 15
                    });
                    var contentString = $templateCache.get('mapTemplate.html');
                    contentString = contentString.replace('{{helloMessage}}', $scope.text.contactMarker).replace('{{address}}', $scope.text.contactAddress);
                    var infowindow = new google.maps.InfoWindow({
                        content: contentString
                    });

                    var marker = new google.maps.Marker({
                        position: myCoords,
                        map: map,
                        title: $scope.text.contactMarker
                    });
                    infowindow.open(map, marker);
                }
            })();

            $scope.submitForm = function() {
                debugger;
                if ($scope.gRecaptchaResponse === "") { //if string is empty
                    alert($scope.text.resolveCaptcha);
                } else {
                    var post_data = { //prepare payload for request
                        'form': $scope.form,
                        'g-recaptcha-response': vcRecaptchaService.getResponse() //send g-captcah-reponse to our server
                    };
                    sharingSvc.sendContactForm(post_data);
                }
            };
        }
    ]);
