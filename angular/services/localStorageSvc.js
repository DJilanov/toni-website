'use strict';

angular.module('Services').factory('localStorageSvc', [function(){

    function localStorageExists(){
        return window.localStorage;
    }

    function setItem(key, value){
        localStorage.setItem(key, value);
    }

    function getItem(key){
        return localStorage.getItem(key);
    }

    return {
        localStorageExists: localStorageExists,
        setItem: setItem,
        getItem: getItem
    };
}
]);
