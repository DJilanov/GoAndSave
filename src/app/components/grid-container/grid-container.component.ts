import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-grid-container',
	templateUrl: './grid-container.component.html',
	styleUrls: ['./grid-container.component.scss']
})
export class GridContainerComponent {

	constructor(
		private router: Router,
		private backendService: BackendService
	) {
		// if(!backendService.isLogged()) {
		// 	router.navigate(['/login']);
		// }
	}
}
