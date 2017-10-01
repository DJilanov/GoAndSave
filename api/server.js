/**
 * @server Used to declare the server and set all back-end functionallity
 */

// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
// used to contain the cache of the db so we can skip the calls to there
var cache = require('./cache');
// used to search in our db
var dbFinder = require('./dbFinder');
// used to update our db
var dbUpdator = require('./dbUpdator');
// used to validate the login form that we are allowed to work with that
var validator = require('./validator');
// we connect to the db using the credentials and fetch the db localy
dbUpdator.connectDb();
dbFinder.setCache(cache);
dbUpdator.setCache(cache);
// this will let us get nv.PORT || 8080;        // set our port

var port = process.env.PORT || 8080; // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router
// START THE SERVER
// =============================================================================
app.listen(port);
app.use(bodyParser());

// CORS header security off.
// TODO: !!!!IMPORTANT!!!! When we have specific domain we MUST enable it!
app.all('/*', function(req, res, next) {
    // we allow everyone to make calls ( we can easy block it to single domain where it is deployed )
    res.header("Access-Control-Allow-Origin", "*");
    // allow all methods
    // TODO: OPTIONS is not implemented to return all options. Do it!
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    // allow the request for the scripts
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    // we call the real root
    next();
});
// to check is the API live or its dead
app.get('/api/heartbeat', function(req, res) {
    // TODO: IMPLEMENT LOGIC FOR DATA CHANGES SO IT CAN WORK LIKE SOCKETS
    res.json({
        working: true,
    });
});
// when we call from the service we return the users
app.post('/api/login', function(req, res) {
    if(validator.validateLogin(req.body)) {
        res.status(200).json({
            success: true
        });
    } else {
        res.status(401).json({
            success: false
        });
    }
});
// when we call from the service we return the brands
app.post('/api/getBrands', function(req, res) {
    if(validator.validateLogin(req.body)) {
        dbFinder.returnAllBrands(req, res);
    } else {
        res.status(401).json({
            success: false
        });
    }
});
// when we call from the service we return the companies
app.post('/api/updateBrand', function(req, res) {
    if(validator.validateLogin(req.body)) {
        dbFinder.returnAllBrands(req, res);
    } else {
        res.status(401).json({
            success: false
        });
    }
});
// when we call from the service we delete the brand
app.post('/api/deleteBrand', function(req, res) {
    if(validator.validateLogin(req.body)) {
        dbUpdator.deleteBrand(req, res);
    } else {
        res.status(401).json({
            success: false
        });
    }
});
// when we call from the service we return the stores
app.post('/api/getStores', function(req, res) {
    if(validator.validateLogin(req.body)) {
        dbFinder.returnAllStores(req, res);
    } else {
        res.status(401).json({
            success: false
        });
    }
});
// when we call from the service we return the stores of specific brand
app.post('/api/getStoresByBrand', function(req, res) {
    if(validator.validateLogin(req.body)) {
        dbFinder.returnStoresByBrand(req, res);
    } else {
        res.status(401).json({
            success: false
        });
    }
});
// when we call from the service we update the store
app.post('/api/updateStore', function(req, res) {
    if(validator.validateLogin(req.body)) {
        dbUpdator.updateStore(req, res);
    } else {
        res.status(401).json({
            success: false
        });
    }
});
// when we call from the service we delete the store
app.post('/api/deleteStore', function(req, res) {
    if(validator.validateLogin(req.body)) {
        dbUpdator.deleteStore(req, res);
    } else {
        res.status(401).json({
            success: false
        });
    }
});
// when we call from the service we add the sended stores to a brand
app.post('/api/postBrandAndStores', function(req, res) {
    if(validator.validateLogin(req.body)) {
        dbFinder.returnAllCompanies(req, res);
    } else {
        res.status(401).json({
            success: false
        });
    }
});

console.log('Server is UP at ' + port);
