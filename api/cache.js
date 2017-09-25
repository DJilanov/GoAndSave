/**
 * @cache Used to cache the data from the db for faster and easier workflow
 * It wont work corretly with multiple apps. If we want multiple apps for
 * back-end we wont be able to cache the info for skiping database calls
 */
(function() {
    var companies = [];
    /**
     * @getProducts it returns all of the companies that are currently cached
     */
    function getCompanies() {
        return companies;
    }
    /**
     * @setCompanies it sets companies to the cache
     * @newCompany <newCompany[]> the new companies array
     */
    function setCompanies(newCompany) {
        companies = newCompany;
    }

    module.exports = {
        getCompanies: getCompanies,
        setCompanies: setCompanies
    };
}());
