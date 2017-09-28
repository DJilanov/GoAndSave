import { Injectable } from '@angular/core';

@Injectable()
// Will contain all of the urls and constants of the app
export class Config {
    public static get loginUrl():string { return "http://192.168.1.3:8080/api/loginUrl"; }
    public static get postDataUrl():string { return "http://192.168.1.3:8080/api/postDataUrl"; }
    public static get companiesUrl():string { return "http://192.168.1.3:8080/api/companiesUrl"; }
}
