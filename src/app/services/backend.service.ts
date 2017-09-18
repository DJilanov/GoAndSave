import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class BackendService {

	constructor(private http: Http) { }

	getPlaceFromCoordinates(latitude, longitude): Promise<any> {
		return this.http
			.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}`)
			.toPromise()
			.then(response => response.json());
	}
}
