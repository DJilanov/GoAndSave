// used as container for the main constants of the back-end
(function() {
    var config = {
        // official db
        dbAddress: 'mongodb://{{user}}:{{password}}@ds151554.mlab.com:51554/goandsave',
        // used for the back-end
        dbUser: 'admin',
        dbPassword: '12321',
        // TODO: MOVE IT TO THE DATABASE
        // used for the front-end
        username: 'admin',
        password: '12321'
    };

    /**
    * @getConfig exporting function of the config object
    */
    function getConfig() {
        return config;
    }

    module.exports = {
        getConfig: getConfig
    };
}());
