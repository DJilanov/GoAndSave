import { Injectable } from '@angular/core';

@Injectable()
// Will contain all of the urls and constants of the app
export class Config {
    public static get loginUrl():string { return "http://http://194.79.15.200/api/pages"; }
    public static get postUrl():string { return "http://http://194.79.15.200/api/pages"; }
}
