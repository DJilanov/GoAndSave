/**
 * @cache Used to cache the data from the db for faster and easier workflow
 * It wont work corretly with multiple apps. If we want multiple apps for
 * back-end we wont be able to cache the info for skiping database calls
 */
(function() {
    let brands = [];
    let stores = [];
    let analytics = [];
    /**
     * @getBrands it returns all of the companies that are currently cached
     */
    function getBrands() {
        return brands;
    }
    /**
     * @setBrands it sets companies to the cache
     * @Array <newBrand[]> the new companies array
     */
    function setBrands(newBrand) {
        brands = newBrand;
    }
    /**
     * @getStores it returns all of the stores that are currently cached
     */
    function getStores() {
        return brands;
    }
    /**
     * @returnStoresByBrand it returns all of the stores that are from specific brand
     */
    function returnStoresByBrand(brand) {
        return stores.filter((store) => {
            return store.brandId == brand._id;
        });
    }
    /**
     * @setStores it sets stores to the cache
     * @Array <newStore[]> the new stores array
     */
    function setStores(newStore) {
        stores = newStore;
    }
    /**
     * @getBrands it returns all of the analytics that are currently cached
     */
    function getAnalytics() {
        return analytics;
    }
    /**
     * @setAnalytics it sets analytics to the cache
     * @Array <newAnalytic[]> the new analytics array
     */
    function setAnalytics(newAnalytic) {
        analytics = newAnalytic;
    }

    module.exports = {
        getBrands: getBrands,
        setBrands: setBrands,
        getStores: getStores,
        setStores: setStores,
        getAnalytics: getAnalytics,
        setAnalytics: setAnalytics,
        returnStoresByBrand: returnStoresByBrand
    };
}());
