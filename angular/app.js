'use strict';

var isSafari = /constructor/i.test(window.HTMLElement);
if (isSafari) {
    var file = location.pathname.split( '/' ).pop();

    var link = document.createElement( 'link' );
    link.href = file.substr( 0, file.lastIndexOf( '.' ) ) + 'styles/safari.css';
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.media = 'screen,print';

    document.getElementsByTagName( 'head' )[0].appendChild( link );
}



var _mainModules = [
  //  ,'Filters'
   'ngRoute'
   ,'ngResource'
   ,'ui.bootstrap'
   ,'ngAnimate'
  //  ,'ngSanitize'
  //  ,'ngCookies'
   // ,'ngAnimate'
   // ,'ngTouch'
  //  ,'ngMock'
  //  ,'ngLocale'
   // ,'pasvaz.bindonce'
    //,'Services'
    ,'Home'
    ,'Header'
    ,'Login'
    //,'Modals'
    ,'Product'
    ,'Profile'
    ,'View'
    ,'Contacts'
    ,'Carousel'
    ,'Cart'
    ,'Order'
    ,'vcRecaptcha'
   // ,'infinite-scroll'
   // ,'Modals'
];

angular.module('app', _mainModules )
    .config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider){
        $routeProvider
            .otherwise({
                redirectTo: '/home'
            });

        var routes = [];

        routes.push({
            name: '/home',
            params: {
                templateUrl:  './angular/home/views/home.html',
                controller: 'HomeCtrl'
            }
        });

        routes.push({
            name: '/login',
            params: {
                templateUrl:  './angular/login/views/login.html',
                controller: 'LoginCtrl'
            }
        });

        routes.push({
            name: '/register',
            params: {
                templateUrl:  './angular/login/views/login.html',
                controller: 'LoginCtrl'
            }
        });

        routes.push({
            name: '/profile',
            params: {
                templateUrl:  './angular/profile/views/profile.html',
                controller: 'ProfileCtrl'
            }
        });

        routes.push({
            name: '/product/:id',
            params: {
                templateUrl: './angular/product/views/product.html',
                controller: 'ProductCtrl'
            }
        });

        routes.push({
            name: '/view/:title',
            params: {
                templateUrl: './angular/view/views/view.html',
                controller: 'ViewCtrl'
            }
        });

        routes.push({
            name: '/contacts',
            params: {
                templateUrl: './angular/contacts/views/contacts.html',
                controller: 'ContactsCtrl'
            }
        });

        routes.push({
            name: '/cart',
            params: {
                templateUrl: './angular/cart/views/cart.html',
                controller: 'CartCtrl'
            }
        });

        routes.push({
            name: '/order',
            params: {
                templateUrl: './angular/order/views/order.html',
                controller: 'OrderCtrl'
            }
        });


// yo:ngRoutes

        routes.forEach(function(route){
            $routeProvider.when(route.name, route.params);
        });

        var $http,
            interceptor = ['$q', '$injector', function ($q, $injector) {
                var notificationChannel;

                function success(response) {
                    // get $http via $injector because of circular dependency problem
                    $http = $http || $injector.get('$http');
                    // don't send notification until all requests are complete
                    if ($http.pendingRequests.length < 1) {
                        // get requestNotificationChannel via $injector because of circular dependency problem
                        notificationChannel = notificationChannel || $injector.get('requestNotificationChannelSvc');
                        // send a notification requests are complete
                        notificationChannel.requestEnded();
                    }
                    return response;
                }

                function error(response) {
                    // get $http via $injector because of circular dependency problem
                    $http = $http || $injector.get('$http');
                    // don't send notification until all requests are complete
                    if ($http.pendingRequests.length < 1) {
                        // get requestNotificationChannel via $injector because of circular dependency problem
                        notificationChannel = notificationChannel || $injector.get('requestNotificationChannelSvc');
                        // send a notification requests are complete
                        notificationChannel.requestEnded();
                    }
                    return $q.reject(response);
                }

                return function (promise) {
                    // get requestNotificationChannel via $injector because of circular dependency problem
                    notificationChannel = notificationChannel || $injector.get('requestNotificationChannelSvc');
                    // send a notification requests are complete
                    notificationChannel.requestStarted();
                    return promise.then(success, error);
                };
            }];

        $httpProvider.interceptors.push(interceptor);

    }])
    .constant('serverErrorMsg','Server error!')
    .constant('sessionToken', 'session-token')
    .constant('infiniteScrollEnabled', true);



