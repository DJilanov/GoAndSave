import { Injectable } from '@angular/core';

@Injectable()
// Will contain all of the urls and constants of the app
export class Config {
    // localhost
    // public static get login():string { return "http://192.168.1.3:9090/api/login"; }
    // public static get getBrands():string { return "http://192.168.1.3:9090/api/getBrands"; }
    // public static get updateBrand():string { return "http://192.168.1.3:9090/api/updateBrand"; }
    // public static get deleteBrand():string { return "http://192.168.1.3:9090/api/deleteBrand"; }
    // public static get getStores():string { return "http://192.168.1.3:9090/api/getStores"; }
    // public static get getStoresByBrand():string { return "http://192.168.1.3:9090/api/getStoresByBrand"; }
    // public static get updateStore():string { return "http://192.168.1.3:9090/api/updateStore"; }
    // public static get deleteStore():string { return "http://192.168.1.3:9090/api/deleteStore"; }
    // public static get postBrandAndStores():string { return "http://192.168.1.3:9090/api/postBrandAndStores"; }
    // staging
    public static get login():string { return "http://192.168.135.111:9090/api/login"; }
    public static get getBrands():string { return "http://192.168.135.111:9090/api/getBrands"; }
    public static get updateBrand():string { return "http://192.168.135.111:9090/api/updateBrand"; }
    public static get deleteBrand():string { return "http://192.168.135.111:9090/api/deleteBrand"; }
    public static get getStores():string { return "http://192.168.135.111:9090/api/getStores"; }
    public static get getStoresByBrand():string { return "http://192.168.135.111:9090/api/getStoresByBrand"; }
    public static get updateStore():string { return "http://192.168.135.111:9090/api/updateStore"; }
    public static get deleteStore():string { return "http://192.168.135.111:9090/api/deleteStore"; }
    public static get postBrandAndStores():string { return "http://192.168.135.111:9090/api/postBrandAndStores"; }
}
