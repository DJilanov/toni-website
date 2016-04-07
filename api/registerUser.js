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
    function registerUser(collection, element, callback) {
        sendAndReturn(collection, element, callback);

    }
    // here we send the element to the database and we return info
    function sendAndReturn(collection, element, callback) {
        var querry = {
            "_id": ObjectId(element._id)
        };
        var data = secondaryQuerry['$set'];
        collection.insertOne(data, callback);
    }

    module.exports = {
        registerUser   : registerUser,
        setConfig       : setConfig
    };
}());
