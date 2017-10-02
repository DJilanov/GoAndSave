/**
 * @dbFinder Used to search in the db
 */
(function() {
    // we use it for creation of new object ids
    let ObjectId = require('mongodb').ObjectID;
    let mongoose = require('mongoose');
    // set Promise provider to bluebird
    mongoose.Promise = require('bluebird');
    let config = require('./config').getConfig();
    let validator = require('./validator');
    let cache = null;

    /**
     * @setCache set the cache as local variable
     * @cacheModule {Object} The cache module
     */
    function setCache(cacheModule) {
        cache = cacheModule;
    }

    /**
     * @buildQuery build the search by id query
     * @id {String} The id of the sended user
     */
    function buildQuery(id) {
        let query = {
            "_id": new ObjectId(id)
        };
        return query;
    }

    /**
     * @createBrand creates new brand and send it to the db
     * @req {Object} The query from the front-end
     * @res {Object} The res to the front-end
     */
    function createBrand(req, res) {
        let body = req.body;
        let update = buildBrandData(body.brand);
        
        mongoose.connection.db.collection('brands', (err, collection) => {
            if(!collection) {
                return;
            }
            // return data about the new brand
            collection.insertOne(update, (err, docs) => {
                if(!err) {
                    cache.addBrand(update);
                    returnSuccess(res, update);
                } else {
                    returnProblem(res, err);
                }
            });
        });
    }

    /**
     * @updateStore updates brand and send it to the db
     * @req {Object} The query from the front-end
     * @res {Object} The res to the front-end
     */
    function updateBrand(req, res) {
        let body = req.body;
        let query = buildQuery(body.brand._id);
        let update = buildBrandData(body.brand);
        mongoose.connection.db.collection('brands', (err, collection) => {
            if(!collection) {
                return;
            }
            collection.update(query, update, (err, docs) => {
                if(!err) {
                    cache.updateBrand(body.brand._id, body.brand);
                    returnSuccess(res, update);
                } else {
                    returnProblem(res, err);
                }
            });
        });
    }

    /**
     * @deleteBrand deletes your brand
     * @req {Object} The query from the front-end
     * @res {Object} The res to the front-end
     */
    function deleteBrand(req, res) {
        let body = req.body;
        let query = buildQuery(body.brand._id);
        mongoose.connection.db.collection('brands', (err, collection) => {
            if(!collection) {
                return;
            }
            collection.remove(query, (err, docs) => {
                if(!err) {
                    cache.removeBrand(body.brand._id);
                    returnSuccess(res, {
                        sucess: true
                    });
                } else {
                    returnProblem(res, err);
                }
            });
        });
    }

    /**
     * @createStore creates new store and send it to the db
     * @req {Object} The query from the front-end
     * @res {Object} The res to the front-end
     */
    function createStore(req, res) {
        let body = req.body;
        let update = buildStoreData(body.store);
        
        mongoose.connection.db.collection('stores', (err, collection) => {
            if(!collection) {
                return;
            }
            // return data about the new store
            collection.insertOne(update, (err, docs) => {
                if(!err) {
                    cache.addStore(update);
                    this.createAnalytics(update);
                } else {
                    returnProblem(res, err);
                }
            });
        });
    }

    /**
     * @updateStore updates store and send it to the db
     * @req {Object} The query from the front-end
     * @res {Object} The res to the front-end
     */
    function updateStore(req, res) {
        let body = req.body;
        let query = buildQuery(body.store._id);
        let update = buildStoreData(body.store);
        mongoose.connection.db.collection('stores', (err, collection) => {
            if(!collection) {
                return;
            }
            collection.update(query, update, (err, docs) => {
                if(!err) {
                    cache.updateStore(body.store._id, body.store);
                    returnSuccess(res, update);
                } else {
                    returnProblem(res, err);
                }
            });
        });
    }

    /**
     * @deleteStore deletes store
     * @req {Object} The query from the front-end
     * @res {Object} The res to the front-end
     */
    function deleteStore(req, res) {
        let body = req.body;
        let query = buildQuery(body.store._id);
        mongoose.connection.db.collection('stores', (err, collection) => {
            if(!collection) {
                return;
            }
            collection.remove(query, (err, docs) => {
                if(!err) {
                    cache.removeStore(body.store._id);
                    returnSuccess(res, {
                        sucess: true
                    });
                } else {
                    returnProblem(res, err);
                }
            });
        });
    }

    /**
     * @createAnalytics creates new analytics and send it to the db
     * @req {Object} The query from the front-end
     * @res {Object} The res to the front-end
     */
    function createAnalytics(store) {
        let update = buildAnalyticsData(store);
        
        mongoose.connection.db.collection('analytics', (err, collection) => {
            if(!collection) {
                return;
            }
            // return data about the new store
            collection.insertOne(update, (err, docs) => {
                if(!err) {
                    cache.addAnalytics(update);
                } else {
                    console.log('error:' + err);
                }
            });
        });
    }

    /**
     * @updateStore updates store and send it to the db
     * @req {Object} The query from the front-end
     * @res {Object} The res to the front-end
     */
    function updateStore(req, res) {
        let body = req.body;
        let query = buildQuery(body.store._id);
        let update = buildStoreData(body.store);
        mongoose.connection.db.collection('stores', (err, collection) => {
            if(!collection) {
                return;
            }
            collection.update(query, update, (err, docs) => {
                if(!err) {
                    cache.updateStore(body.store._id, body.store);
                    returnSuccess(res, update);
                } else {
                    returnProblem(res, err);
                }
            });
        });
    }

    /**
     * @buildAnalyticsData creates the object that we send to the db
     * @Store {Object} Store object
     */
    function buildAnalyticsData(store) {
        return {
            storeId: store._id.toString(),
            views: []
        }
    }

    /**
     * @buildBrandData creates the object that we send to the db
     * @brand {Object} Brand object
     */
    function buildBrandData(brand) {
        return {
            brandName: brand.brandName,
            brandDefaultRadius: brand.brandDefaultRadius,
            notificationDefaultTitle: brand.notificationDefaultTitle,
            notificationDefaultBody: brand.notificationDefaultBody
        }
    }

    /**
     * @buildStoreData creates the object that we send to the db
     * @store {Object} Store object
     */
    function buildStoreData(store) {
        return {
            brandId: store.brandId.toString(),
            storeName: store.storeName,
			storeAddress: store.storeAddress,
			customStoreRadius: store.customStoreRadius,
			lat: store.lat,
			lng: store.lng,
			notificationTitle: store.notificationTitle,
			notificationBody: store.notificationBody,
			promoStart: store.promoStart,
			promoEnd: store.promoEnd
        }
    }

    /**
     * @buildStoreDataFromArray creates the object that we send to the db
     * @store {Object} Store object
     */
    function buildStoreDataFromArray(store) {
        return {
            storeName: store[2],
			storeAddress: store[1],
			customStoreRadius: store[0],
			lat: store[8],
			lng: store[7],
			notificationTitle: store[5],
			notificationBody: store[6],
			promoStart: store[3],
			promoEnd: store[4]
        }
    }

    /**
     * @handleBrandAndStores handles the making new stores
     * @req {Object} The req of the front-end
     * @res {Object} The response to the front-end
     */
    function handleBrandAndStores(req, res) {
        let body = req.body;
        let brand = body.data.brand;
        let stores = body.data.stores;
        let self = this;
        if(brand.new) {
            // mongoose.connection.db.collection('stores', function(err, collection) {
            //     if(!collection) {
            //         return;
            //     }
            //     collection.update(query, update, (err, docs) => {
            //         if(!err) {
            //             cache.updateStore(body.store._id, body.store);
            //             returnSuccess(res, update);
            //         } else {
            //             returnProblem(res, err);
            //         }
            //     });
            // });
        } else {
            mongoose.connection.db.collection('stores', (err, collection) => {
                if(!collection) {
                    return;
                }
                stores.forEach((store, index, array) => {
                    let storeData = buildStoreDataFromArray(store)
                    storeData.brandId = brand._id;
                    collection.insertOne(storeData, (err, docs) => {
                        if(!err) {
                            cache.addStore(storeData);
                            self.createAnalytics(storeData);
                        } else {
                            returnProblem(res, err);
                        }
                        if(!array[index + 1]) {
                            returnSuccess(res, {
                                sucess: true
                            });
                        }
                    });
                });
            });
        }
    }

    /**
     * @returnSuccess returns success data to the front-end
     * @res {Object} The res to the front-end
     * @response {Object} The response from the database
     */
    function returnSuccess(res, response) {
        res.json({
            done: true,
            reason: null,
            data: response
        });
    }

    /**
     * @returnProblem Returns the error to the front-end ( when delete non existing user or there is some problem )
     * @err {Object} Error object from the database
     * @res {Object} The res to the front-end
     * @info There were 2 options: return 4** with error body or return 200 with reason. I chouse 200 becouse there is no problem
     *          with the back-end... there is problem with your call.. 4** must be returned if there is problem with the API
     */
    function returnProblem(res, err) {
        res.json({
            done: false,
            reason: err
        });
    }

    /**
     * @connectDb Used to make the connection to the Database
     */
    function connectDb() {
       // we cache the product list when we open the back-end for faster working speed
        mongoose.connection.on('connected', () => {
            console.log('[dbConnector]Mongoose default connection open');
            mongoose.connection.db.collection('brands', (err, collection) => {
                collection.find().toArray((err, brands) => {
                    cache.setBrands(brands);
                });
            });
            mongoose.connection.db.collection('stores', (err, collection) => {
                collection.find().toArray((err, stores) => {
                    cache.setStores(stores);
                });
            });
            mongoose.connection.db.collection('analytics', (err, collection) => {
                collection.find().toArray((err, analytics) => {
                    cache.setAnalytics(analytics);
                });
            });
        });

        // If the connection throws an error
        mongoose.connection.on('error', (err) => {
            console.log('[dbConnector]Mongoose default connection error: ' + err);
        });

        // When the connection is disconnected
        mongoose.connection.on('disconnected', () => {
            console.log('[dbConnector]Mongoose default connection disconnected');
        });

        // If the Node process ends, close the Mongoose connection
        process.on('SIGINT', () => {
            mongoose.connection.close(() => {
                console.log('[dbConnector]Mongoose default connection disconnected through app termination');
                process.exit(0);
            });
        });
        // get database
        var dataBaseURL = config.dbAddress.replace('{{user}}', config.dbUser).replace('{{password}}', config.dbPassword);
        mongoose.connect(dataBaseURL);
    }

    module.exports = {
        setCache: setCache,
        connectDb: connectDb,
        createStore: createStore,
        updateStore: updateStore,
        deleteStore: deleteStore,
        createBrand: createBrand,
        updateBrand: updateBrand,
        deleteBrand: deleteBrand,
        createAnalytics: createAnalytics,
        handleBrandAndStores: handleBrandAndStores
    };
}());
