import { Injectable } from '@angular/core';

@Injectable()
// Will contain all of the urls and constants of the app
export class Config {
    // localhost
    public static get login():string { return "http://192.168.1.2:8080/api/login"; }
    public static get getBrands():string { return "http://192.168.1.2:8080/api/getBrands"; }
    public static get getStores():string { return "http://192.168.1.2:8080/api/getStores"; }
    public static get getStoresByBrand():string { return "http://192.168.1.2:8080/api/getStoresByBrand"; }
    public static get updateBrand():string { return "http://192.168.1.2:8080/api/updateBrand"; }
    public static get updateStore():string { return "http://192.168.1.2:8080/api/updateStore"; }
    public static get deleteStore():string { return "http://192.168.1.2:8080/api/deleteStore"; }
    public static get postBrandAndStores():string { return "http://192.168.1.2:8080/api/postBrandAndStores"; }
    // staging
    // public static get loginUrl():string { return "http://172.16.89.72:8080/api/loginUrl"; }
    // public static get postDataUrl():string { return "http://172.16.89.72:8080/api/postDataUrl"; }
    // public static get companiesUrl():string { return "http://172.16.89.72:8080/api/companiesUrl"; }
}
