import { Component, OnInit } from '@angular/core';

import { BackendService } from './services/backend.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	loggedIn = null;
	constructor(
		private backendService: BackendService
	) {
		
	}
}
