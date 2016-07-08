// home. Used for standart users
(function() {
    var config = null;

    // here we use the mongoose to call the api and get the database for the
    // user viewed website
    var mongoose = require('mongoose');
    // here we save the db with the categories for the nav
    var categoryDatabase = {};
    // here we save the db with the products
    var productsDatabase = {};
    // here we save the db with the messages
    var messageDatabase = {};
    // here we save the db with the orders
    var ordersDatabase = {};
    // here we save the db with the users
    var usersDatabase = {};
    // current collection we update
    var userCollectionCopy = {};
    // current res we update
    var resCopy = {};
    // users controller
    var registerUser      = require('./registerUser');
    var userUpdate        = require('./updateUser');

    function loginUser(element, res) {
        // check is that email already used
        mongoose.connection.db.collection('users', function(err, collection) {
            console.log('[Home] loginUser err: ' + err);
            collection.find({ "email": element.email }).toArray(function(err, docs) {
                if (docs[0] != undefined) {
                    if (element.password === docs[0].password) {
                        res.send({
                            'response': docs[0],
                            'error': false
                        });
                    } else {
                        res.send({
                            'updated': false,
                            'error': true
                        });
                    }
                } else {
                    res.send({
                        'updated': false,
                        'error': true
                    });
                }
                // if the email is used check password and if it is same return acc info
            });
        });
    }

    function registerNewUser(element, res) {
        mongoose.connection.db.collection('users', function(err, collection) {
            console.log('[Home] registerNewUser err: ' + err);
            collection.find({ "email": element.email }).toArray(function(err, docs) {
                if (docs[0] != undefined) {
                    res.send({
                        'updated': false,
                        'error': true
                    });
                } else {
                    registerUser.register(collection, element, registerUsersCollection);
                    userCollectionCopy = collection;
                    resCopy = res;
                }
            });
        });
    }

    function updateUser(user, res) {
        mongoose.connection.db.collection('users', function(err, collection) {
            console.log('[Home] updateUser err: ' + err);
            collection.find({ "token": user.token }).toArray(function(err, docs) {
                if (docs[0] == undefined) {
                    res.send({
                        'updated': false,
                        'error': true
                    });
                } else {
                    userUpdate.update(collection, user, updateUsersCollection);
                    userCollectionCopy = collection;
                    resCopy = res;
                }
            });
        });
    }

    function resSend(err, doc) {
        if (err) {
            console.log('Error:' + err);
            resCopy.send({
                'updated': false,
                'error': err
            });
        } else {
            resCopy.send({
                'updated': true,
                'error': false,
                'response': doc
            });
        }
    }

    function updateUsersCollection(err, doc) {
        updateUsers(err, doc);
    }

    function registerUsersCollection(err, doc) {
        registerUsers(err, doc);
    }

    function getCategoryDatabase() {
        return categoryDatabase;
    }

    function getProductDatabase() {
        return productsDatabase;
    }

    function getMessagesDatabase() {
        return messageDatabase;
    }

    function getOrdersDatabase() {
        return ordersDatabase;
    }

    function setConfig(loadedConfig) {
        config = loadedConfig;
        // add the config to the users
        registerUser.setConfig(loadedConfig);
    }

    function registerUsers(err, doc) {
        userCollectionCopy.find().toArray(function(err, docs) {
            usersDatabase = docs;
            console.log('Update users database');
        });
        // check the doc or err for the user we created. Needs better logic
        resSend(err, doc.ops[0]);
    }

    function updateUsers(err, doc) {
        userCollectionCopy.find().toArray(function(err, docs) {
            usersDatabase = docs;
            console.log('Update users database');
        });
        // check the doc or err for the user we created. Needs better logic
        resSend(err, doc);
    }

    function updateMessages(collection) {
        collection.find().toArray(function(err, docs) {
            messageDatabase = docs;
            // TODO: Save all of the personal message to the person they are send from
            console.log('Update messages database');
        });
    }

    function updateOrders(collection) {
        collection.find().toArray(function(err, docs) {
            ordersDatabase = docs;
            // TODO: Save all of the personal orders to the person they are send from
            console.log('Update orders database');
        });
    }

    function updateProducts(collection) {
        collection.find().toArray(function(err, docs) {
            productsDatabase = docs;
            console.log('Update products database');
        });
    }

    function updateCategories(collection) {
        collection.find().toArray(function(err, docs) {
            categoryDatabase = docs;
            console.log('Update categories database');
        });
    }

    function connectDb() {
        // we cache the product list by the viewing user
        mongoose.connection.on('connected', function() {
            console.log('[Home.js]Mongoose default connection open');
            mongoose.connection.db.collection('products', function(err, collection) {
                collection.find().toArray(function(err, docs) {
                    productsDatabase = docs;
                });
            });
            mongoose.connection.db.collection('categories', function(err, collection) {
                collection.find().toArray(function(err, docs) {
                    categoryDatabase = docs;
                });
            });
            mongoose.connection.db.collection('messages', function(err, collection) {
                collection.find().toArray(function(err, docs) {
                    messageDatabase = docs;
                });
            });
            mongoose.connection.db.collection('orders', function(err, collection) {
                collection.find().toArray(function(err, docs) {
                    ordersDatabase = docs;
                });
            });
            mongoose.connection.db.collection('users', function(err, collection) {
                collection.find().toArray(function(err, docs) {
                    usersDatabase = docs;
                });
            });
        });

        // If the connection throws an error
        mongoose.connection.on('error', function(err) {
            console.log('[Home.js]Mongoose default connection error: ' + err);
        });

        // When the connection is disconnected
        mongoose.connection.on('disconnected', function() {
            console.log('[Home.js]Mongoose default connection disconnected');
        });

        // If the Node process ends, close the Mongoose connection
        process.on('SIGINT', function() {
            mongoose.connection.close(function() {
                console.log('[Home.js]Mongoose default connection disconnected through app termination');
                process.exit(0);
            });
        });
        // get database
        // mongoose.connect('mongodb://'+ config.dbUsername +':'+ config.dbPassword + config.api);
        mongoose.connect('mongodb://admin:toni1221@ds047792.mongolab.com:47792/toni-website');
    }

    module.exports = {
        connectDb: connectDb,
        setConfig: setConfig,
        getCategoryDatabase: getCategoryDatabase,
        getProductDatabase: getProductDatabase,
        getMessagesDatabase: getMessagesDatabase,
        getOrdersDatabase: getOrdersDatabase,
        updateProducts: updateProducts,
        updateCategories: updateCategories,
        updateMessages: updateMessages,
        updateOrders: updateOrders,
        updateUser: updateUser,
        loginUser: loginUser,
        registerNewUser: registerNewUser
    };
}());
