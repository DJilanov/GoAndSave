/**
 * @dbFinder Used to search in the db
 */
(function() {
    // we use it for creation of new object ids
    let ObjectId = require('mongodb').ObjectID;
    let mongoose = require('mongoose');
    let config = require('./config').getConfig();
    let cache = null;

    /**
     * @setCache set the cache as local variable
     * @cache {Object} The cache object
     */
    function setCache(cacheModule) {
        cache = cacheModule;
    }
    /**
     * @returnAllBrands It returns all of the brands from the back-end
     * @req {Object} The query from the front-end
     * @res {Object} The res to the front-end
     */
    function returnAllBrands(req, res) {
        res.json(cache.getBrands());
    }
    /**
     * @returnAllStores It returns all of the stores from the back-end
     * @req {Object} The query from the front-end
     * @res {Object} The res to the front-end
     */
    function returnAllStores(req, res) {
        res.json(cache.getStores());
    }
    /**
     * @returnStoresByBrand It returns all of the stores from the back-end by specific brand
     * @req {Object} The query from the front-end
     * @res {Object} The res to the front-end
     */
    function returnStoresByBrand(req, res) {
        res.json(cache.returnStoresByBrand(req.body.brand));
    }
    /**
     * @buildSearchQueryById It builds the searching query
     * @req {Object} The query from the front-end
     * @parameter {Object} The query for the db
     */
    function buildSearchQueryById(parameters) {
        var id = parameters['id'];
        var query = {
            "_id" : ObjectId(id)
        };
        console.log('Builded query for the db: ' + JSON.stringify(query));
        return query;
    }

    module.exports = {
        setCache: setCache,
        returnAllBrands: returnAllBrands,
        returnAllStores: returnAllStores,
        returnStoresByBrand: returnStoresByBrand 
    };
}());
