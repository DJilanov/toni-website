'use strict';

angular.module('Home').factory('sharingSvc', ['$http', '$location',

    function($http, $location) {

    	var productList = {};
    	// used for the fetch
    	var response   = null;
    	var products   = null;
    	var categories = null;
    	var carousel   = null;
    	var contact    = null;

    	var userIds = {};
    	var productToView = null;
        // we fetch the products and show them. we save them into the array for future direct use
        function login(callback, id) {
        	var id = {
		    	"username": id.username,
		    	"password": id.password
		    };
	       	$http({
			    method: 'GET',
			    url: config.api,
			    params: id,
       			headers: {'Content-Type': 'application/json'}
			})
			.success(function(data, status, headers, config) {
			    response = data;
			    userIds = id;
			})
			.error(function(data, status, headers, config) {
			    alert('Error on fetching from the server');
			})
			.then(function(){
				if(response !== "") {
					products = sortProductsByCategory(response.products);
					categories = response.categories;
					for(var categoriesCounter = 0; categoriesCounter < categories.length; categoriesCounter++) {
						categories[categoriesCounter].info = JSON.parse(categories[categoriesCounter].info);
					}
					carousel = response.carousel;
					contact = response.contact;

					callback(products, categories, carousel, contact);
				} else {
					// if tony is a noob
					alert("WRONG PASSWORD NOOB, DELETE THE GAME PLEASE!");
				}

			});
		}
        // we save the products and show alert that it is saved.
        function save(callback, product) {
        	var data = product;
        	if(data.zIndex !== undefined){
        		data.zIndex = parseInt(data.zIndex);
        	}
        	data.username = userIds.username;
        	data.password = userIds.password;
        	var http = {};
        	if(data.attachedImage) {
        		http = $http({
				    method: 'POST',
				    url: config.api + '/' + product.type,
				    params: data,
		            headers: {
		                'Content-Type': 'multipart/form-data'
		            },
		            data: {
		                file: data.attachedImage
		            },
		            transformRequest: function (data, headersGetter) {
		                var formData = new FormData();
		                angular.forEach(data, function (value, key) {
		                    formData.append(key, value);
		                });

		                var headers = headersGetter();
		                delete headers['Content-Type'];

		                return formData;
		            }
				});
        	} else {
        		http = $http({
				    method: 'POST',
				    url: config.api + '/' + product.type,
				    params: data,
		            headers: {
		                'Content-Type': 'application/json'
		            }
				});
        	}

			http.success(function(data, status, headers, config) {
			    response = data;
			})
			.error(function(data, status, headers, config) {
			    alert('Error on fetching from the server');
			})
			.then(function(){
				if(response != null) {
					callback(response);
				}

			});
       	}

       	function getProducts(callback) {
       		// check did we already loged in.
       		var login = {};
       		login.username = localStorage.getItem('username');
       		login.password = localStorage.getItem('password');

       		if(products === null){
       			if(login.username.length > 1) {
       				this.login(callback, login);
       			} else {
       				$location.path( "/home" );
       			}
       		} else {
       			callback(products, categories, carousel);
       		}
       	}
       	// the idea from that function is that after we get
       	function sortProductsByCategory(products) {
       		var sortedProducts = [];
       		var product = {};
       		var category = null;
       		for(var productCounter = 0; productCounter < products.length; productCounter++) {
       			product = products[productCounter];
       			category = parseInt(product.category);
       			if(sortedProducts[category] === undefined) {
       				sortedProducts[category] = [];
       			}
       			sortedProducts[category][sortedProducts[category].length] = product;
       		}
       		return sortedProducts;
       	}

        return {
            login			: login,
            save			: save,
            getProducts		: getProducts
        };
    }
]);
