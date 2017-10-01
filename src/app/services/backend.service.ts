import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Config } from './config';

@Injectable()
export class BackendService {
	userData = {
		// username: null,
		// password: null
		// for testing purposes
		username: 'admin',
		password: '12321'
	}

	constructor(
		private http: Http
	) { 

	}

	isLogged() {
		return this.userData.username;
	}

	getUserData() {
		return this.userData;
	}

	login(username, password): Promise<any> {
		return this.http
			.post(Config.login , {
				username: username,
				password: password
			})
			.toPromise()
			.then((response) => {
				if(response.status !== 400) {
					this.userData = {
						username: username,
						password: password
					}
				}
				return response.json()
			});
	}

	getBrands() {
		return this.http
			.post(Config.getBrands , {
				username: this.userData.username,
				password: this.userData.password
			})
			.toPromise()
			.then((response) => {
				return response.json()
			});
	}

	getStoresByBrand(company) {
		return this.http
			.post(Config.getStoresByBrand , {
				username: this.userData.username,
				password: this.userData.password,
				brand: company
			})
			.toPromise()
			.then((response) => {
				return response.json()
			});
	}

	postBrandAndStores(data) {
		return this.http
			.post(Config.postBrandAndStores , {
				username: this.userData.username,
				password: this.userData.password,
				data: data
			})
			.toPromise()
			.then((response) => {
				return response.json()
			});
	}
}
