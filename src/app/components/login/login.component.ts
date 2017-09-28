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
	showError = false;
	constructor(
		private router: Router,
		private backendService: BackendService
	) {

	}

	onLoginClicked() {
		this.backendService.login(this.userName, this.userPassword)
			.then((response) => {
				this.router.navigate(['/grid']);
			})
			.catch((error => {
				this.showError = true;
			}))
	}
}
