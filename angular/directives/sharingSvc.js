'use strict';

angular.module('Home').factory('sharingSvc', ['$http', '$location',

    function($http, $location) {

        var productToView = null;
        // used for the fetch
        var response = null;
        var products = {};
        var categories = {};
        var firstTime = true;
        var callbackArray = [];
        var loaded = false;
        var text = language.getText();
        var user = {};

        // ----------------------- GET SERVICES -------------------------------
        // we fetch the products and show them. we save them into the array for future direct use
        function getProducts(callback) {
            if ((response === null) && (firstTime)) {
                firstTime = false;
                callbackArray.push(callback);
                returnDummy(callback);
                $http.get(config.api + '/home').success(function(data, status, headers, config) {
                    response = data;
                }).error(function(data, status, headers, config) {
                    alert(text.errorFetchFromServer);
                }).then(function() {
                    loaded = true;
                    // we must rework the app to be build whitout the need of this parsing
                    products = sortProductsByCategory(response.products);
                    categories = response.categories;
                    for (var categoriesCounter = 0; categoriesCounter < categories.length; categoriesCounter++) {
                        if (typeof categories[categoriesCounter].info === 'string') {
                            categories[categoriesCounter].info = JSON.parse(categories[categoriesCounter].info);
                        }
                    }
                    // return the collections
                    for (var callbackCounter = 0; callbackCounter < callbackArray.length; callbackCounter++) {
                        callbackArray[callbackCounter](products, categories);
                    }
                });
            } else {
                if (loaded) {
                    callback(products, categories);
                } else {
                    console.log('call');
                    callbackArray.push(callback);
                    returnDummy(callback);
                }

            }
        }

        function returnDummy(callback) {
            response = config.responsePrototype;
            products = sortProductsByCategory(response.products);
            categories = response.categories;
            for (var categoriesCounter = 0; categoriesCounter < categories.length; categoriesCounter++) {
                if (typeof categories[categoriesCounter].info === 'string') {
                    categories[categoriesCounter].info = JSON.parse(categories[categoriesCounter].info);
                }
            }
            callback(products, categories);
        }

        function getProductToView(callback) {
            if (productToView != undefined) {
                return productToView;
            } else {
                getProducts(callback);
            }

        }

        // the idea from that function is that after we get
        function sortProductsByCategory(products) {
            var sortedProducts = [];
            var product = {};
            var category = null;
            for (var productCounter = 0; productCounter < products.length; productCounter++) {
                product = products[productCounter];
                product.dailyOffer = JSON.parse(product.dailyOffer);
                product.isNew = JSON.parse(product.isNew);
                if (product.carousel !== undefined) {
                    product.carousel = JSON.parse(product.carousel);
                }
                category = parseInt(product.category);
                if (sortedProducts[category] === undefined) {
                    sortedProducts[category] = [];
                }
                sortedProducts[category][sortedProducts[category].length] = product;
            }
            return sortedProducts;
        }

        // ----------------------- POST SERVICES -------------------------------
        // we save the products and show alert that it is saved.
        function sendContactForm(form) {
            grecaptcha.reset();
            form.new = 'true';
            $http.post(config.api + '/home/message', form)
                .success(function(data, status, headers, config) {
                    response = data;
                }).error(function(data, status, headers, config) {
                    alert(text.errorFetchFromServer);
                }).then(function(response) {
                    if (response != null) {
                        alert(text.successSendMessage);
                        // move the page to the home
                        $location.path('/home');
                    }
                });
        }

        // we save the products and show alert that it is saved.
        function sendOrderForm(form) {
            grecaptcha.reset();
            form.new = 'true';
            $http.post(config.api + '/home/order', form)
                .success(function(data, status, headers, config) {
                    response = data;
                }).error(function(data, status, headers, config) {
                    alert(text.errorFetchFromServer);
                }).then(function(response) {
                    if (response != null) {
                        alert(text.orderRecieved);
                        localStorage.setItem('cart', '[]');
                        // move the page to the home
                        $location.path('/home');
                    }

                });
        }

        // we save the products and show alert that it is saved.
        function login(loginInfo) {
            grecaptcha.reset();
            $http.post(config.api + '/login', loginInfo)
                .success(function(data, status, headers, config) {
                    response = data;
                }).error(function(data, status, headers, config) {
                    alert(text.errorFetchFromServer);
                }).then(function(response) {
                    if (!response.data.error) {
                        user = response.data.response;
                        // move the page to the home
                        $location.path('/profile');
                    } else {
                        alert(text.errorWrongPassword);
                    }
                });
        }

        // we save the products and show alert that it is saved.
        function register(regInfo) {
            grecaptcha.reset();
            $http.post(config.api + '/register', regInfo)
                .success(function(data, status, headers, config) {
                    response = data;
                }).error(function(data, status, headers, config) {
                    alert(text.errorFetchFromServer);
                }).then(function(response) {
                    if (!response.data.error) {
                        user = response.data.response;
                        // move the page to the home
                        $location.path('/profile');
                    } else {
                        alert(text.errorFetchFromServer);
                    }
                });
        }

        function setBackgroundIfAvalible(config) {
            if (config.showBackgroundImg) {
                document.getElementById('screen').style.background = "url('img/background.png') no-repeat right top";
                document.getElementById('screen').style.backgroundSize = "100%";
            }
        }

        function viewProduct(product) {
            productToView = product;
        }

        function getUser() {
            return user;
        }

        return {
            login: login,
            register: register,
            getUser: getUser,
            getProducts: getProducts,
            viewProduct: viewProduct,
            getProductToView: getProductToView,
            sendContactForm: sendContactForm,
            sendOrderForm: sendOrderForm
        };
    }
]);
