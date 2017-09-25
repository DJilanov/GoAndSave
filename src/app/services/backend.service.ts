import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Config } from './config';

@Injectable()
export class BackendService {
	userData = {
		username: null,
		password: null
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
			.post(Config.loginUrl , {
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

	fetchCompanies() {
		return this.http
			.post(Config.companiesUrl , {
				username: this.userData.username,
				password: this.userData.password
			})
			.toPromise()
			.then((response) => {
				return response.json()
			});
	}

	uploadData(data) {
		return this.http
			.post(Config.postDataUrl , {
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
