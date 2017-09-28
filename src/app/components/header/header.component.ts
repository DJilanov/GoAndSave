import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { EventBusService } from '../../services/event-bus.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

	constructor(
		private backendService: BackendService,
		private eventBusService: EventBusService
	) { }
}
