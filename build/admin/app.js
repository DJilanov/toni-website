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
  //  ,'ngSanitize'
  //  ,'ngCookies'
   // ,'ngAnimate'
   // ,'ngTouch'
  //  ,'ngMock'
  //  ,'ngLocale'
   // ,'pasvaz.bindonce'
    ,'Home'
    ,'EditNavigation'
    ,'EditProduct'
    ,'EditCategory'
    ,'EditMessages'
    ,'EditOrders'
   // ,'infinite-scroll'
    ,'ui.bootstrap'
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
                templateUrl:  './home/views/home.html',
                controller: 'HomeCtrl'
            }
        });

        routes.push({
            name: '/editNavigation',
            params: {
                templateUrl:  './editNavigation/views/editNavigation.html',
                controller: 'EditNavigationCtrl'
            }
        });

        routes.push({
            name: '/editCarousel',
            params: {
                templateUrl:  './editCarousel/views/editCarousel.html',
                controller: 'EditCarouselCtrl'
            }
        });

        routes.push({
            name: '/editProduct',
            params: {
                templateUrl: './editProduct/views/editProduct.html',
                controller: 'EditProductCtrl'
            }
        });

        routes.push({
            name: '/editCategory',
            params: {
                templateUrl: './editCategory/views/editCategory.html',
                controller: 'EditCategoryCtrl'
            }
        });

        routes.push({
            name: '/messages',
            params: {
                templateUrl: './editMessages/views/editMessages.html',
                controller: 'EditMessagesCtrl'
            }
        });

        routes.push({
            name: '/orders',
            params: {
                templateUrl: './editOrders/views/editOrders.html',
                controller: 'EditOrdersCtrl'
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



