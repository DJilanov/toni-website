// here we update the carousel. Used only for adding and editing
(function() {
    // we use it for creation of new objects
    var ObjectId = require('mongodb').ObjectID;
    // used as container for the config
    var config = null;

    function setConfig(loadedConfig) {
        config = loadedConfig;
    }

    // here we update products into the database
    function register(collection, element, callback) {
        sendAndReturn(collection, element, callback);

    }
    // here we send the element to the database and we return info
    function sendAndReturn(collection, element, callback) {
        var token = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
        var querry = {
            'email': element.email,
            'password': element.password,
            'username': '',
            "address": '',
            "orders": [],
            "messages": [],
            "token": token
        }
        collection.insertOne(querry, callback);
    }

    module.exports = {
        register: register,
        setConfig: setConfig
    };
}());
