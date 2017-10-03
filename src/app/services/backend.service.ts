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
			})
			.catch((error) => {
				alert('Error occured connecting to the server');
			});
	}

	updateBrand(brand) {
		return this.http
			.post(Config.updateBrand , {
				username: this.userData.username,
				password: this.userData.password,
				brand: brand
			})
			.toPromise()
			.then((response) => {
				return response.json()
			})
			.catch((error) => {
				alert('Error occured connecting to the server');
			});
	}

	deleteBrand(brand) {
		return this.http
			.post(Config.deleteBrand, {
				username: this.userData.username,
				password: this.userData.password,
				brand: brand
			})
			.toPromise()
			.then((response) => {
				return response.json()
			})
			.catch((error) => {
				alert('Error occured connecting to the server');
			});
	}

	updateStore(store) {
		return this.http
			.post(Config.updateStore, {
				username: this.userData.username,
				password: this.userData.password,
				store: store
			})
			.toPromise()
			.then((response) => {
				return response.json()
			})
			.catch((error) => {
				alert('Error occured connecting to the server');
			});
	}

	deleteStore(store) {
		return this.http
			.post(Config.deleteStore, {
				username: this.userData.username,
				password: this.userData.password,
				store: store
			})
			.toPromise()
			.then((response) => {
				return response.json()
			})
			.catch((error) => {
				alert('Error occured connecting to the server');
			});
	}

	getStoresByBrand(brand) {
		return this.http
			.post(Config.getStoresByBrand , {
				username: this.userData.username,
				password: this.userData.password,
				brand: brand
			})
			.toPromise()
			.then((response) => {
				return response.json()
			})
			.catch((error) => {
				alert('Error occured connecting to the server');
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
			})
			.catch((error) => {
				alert('Error occured connecting to the server');
			});
	}
}
