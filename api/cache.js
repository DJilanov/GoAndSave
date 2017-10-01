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
     * @addBrand it add brand to the cache
     * @Object <newBrand> the new brand
     */
    function addBrand(newBrand) {
        brands.push(newBrand);
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
     * @addStore it add store to the cache
     * @Object <newStore> the new store
     */
    function addStore(newStore) {
        stores.push(newStore);
    }
    /**
     * @updateStore it updates stores to the cache
     * @Array <newStore[]> the new stores array
     */
    function updateStore(id, newStore) {
        stores.forEach((store) => {
            if(store._id.toString() === id) {
                store.brandId = newStore.brandId;
                store.storeName = newStore.storeName;
                store.storeAddress = newStore.storeAddress;
                store.customStoreRadius = newStore.customStoreRadius;
                store.lat = newStore.lat;
                store.lng = newStore.lng;
                store.notificationTitle = newStore.notificationTitle;
                store.notificationBody = newStore.notificationBody;
                store.promoStart = newStore.promoStart;
                store.promoEnd = newStore.promoEnd;
            }
        })
    }
    /**
     * @removeStore it removes the store from the cache
     * @Strng id of the store
     */
    function removeStore(id) {
        stores.forEach((store, index, array) => {
            if(store._id.toString() === id) {
                array.splice(index, 1);
            }
        })
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
        addStore: addStore,
        getStores: getStores,
        setStores: setStores,
        updateStore: updateStore,
        removeStore: removeStore,
        getAnalytics: getAnalytics,
        setAnalytics: setAnalytics,
        returnStoresByBrand: returnStoresByBrand
    };
}());
