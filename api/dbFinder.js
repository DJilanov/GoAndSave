/**
 * @dbFinder Used to search in the db
 */
(function() {
    // we use it for creation of new object ids
    var ObjectId = require('mongodb').ObjectID;
    var mongoose = require('mongoose');
    var config = require('./config').getConfig();
    var cache = null;

    /**
     * @setCache set the cache as local variable
     * @cache {Object} The cache object
     */
    function setCache(cacheModule) {
        cache = cacheModule;
    }
    /**
     * @fetchAllCompanies It returns all of the companies from the back-end
     * @req {Object} The query from the front-end
     * @res {Object} The res to the front-end
     */
    function returnAllCompanies(req, res) {
        buildResponse(cache.getCompanies(), res);
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
    /**
     * @buildResponse We gather the data and build the response structure that is expected in the front-end
     * @docs {Object} The results from the db
     * @resource {Object} The response object
     */
    function buildResponse(docs, resource) {
        var result = buildResponseStructure(docs);
        resource.json(result);
    }
    /**
     * @buildResponseStructure Build the response structure that is expected in the front-end
     * @results {Object} The results from the db
     */
    function buildResponseStructure(results) {
        // TODO: Make it in a different file so we can controll the response from there
        let response = [];
        for(let userCounter = 0; userCounter < results.length; userCounter++) {
            response[userCounter] = {
                firstName: results[userCounter].first_name,
                lastName: results[userCounter].last_name,
                emailAddress: results[userCounter].email_address,
                dateOfBirth: results[userCounter].date_of_birth,
                id: results[userCounter]._id
            };
        }
        return response;
    }

    module.exports = {
        setCache: setCache
    };
}());
