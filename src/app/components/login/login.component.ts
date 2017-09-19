import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {

	userName;
	userPassword;
	showError;
	constructor(
		private router: Router,
		private backendService: BackendService
	) {

	}

	onLoginClicked() {
		this.backendService.login(this.userName, this.userPassword).then((response) => {
			if(response.status !== 400) {
				this.router.navigate(['/grid']);
			} else {
				this.showError = true;
			}
		})
	}
}
