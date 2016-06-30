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
        function update(collection, element, callback) {
            sendAndReturn(collection, element, callback);

        }
        // here we send the element to the database and we return info
        function sendAndReturn(collection, element, callback) {
            var querry = {
                "token": element.token
            };
            if (typeof element.orders !== 'string') {
                element.messages = JSON.stringify(element.messages);
                element.orders = JSON.stringify(element.orders);
            }
            var secondaryQuerry = {
                $set: {
                    'names': element.names,
                    'phone': element.phone,
                    'other': element.other,
                    'address': element.address,
                }
            };
            console.log('\n[UpdateUsers] Updating user:' + JSON.stringify(element));
            collection.update(querry, secondaryQuerry, callback);
        }

    module.exports = {
        update: update,
        setConfig: setConfig
    };
}());
