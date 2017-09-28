import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { EventBusService } from '../../services/event-bus.service';

@Component({
	selector: 'app-edit-notifications',
	templateUrl: './edit-notifications.component.html',
	styleUrls: ['./edit-notifications.component.scss']
})
export class EditNotificationsComponent {

	public selectedCompany = null;

	public companies: Array<Object> = [
		{
			id: '123',
			brandName: 'test1',
			brandDefaultRadius: 50,
			logoUrl: 'test123',
			notificationDefaultTitle: 'testingtitle',
			notificationDefaultBody: 'testingbody'
		},
		{
			id: '1234',
			brandName: 'test2',
			brandDefaultRadius: 60,
			logoUrl: 'test125',
			notificationDefaultTitle: 'testingtitle2',
			notificationDefaultBody: 'testingbody2'
		}
	];

	constructor(
		private backendService: BackendService,
		private eventBusService: EventBusService
	) {
		this.backendService.fetchCompanies().then(response =>{
			this.companies = response;
		});
	}

	onSelect(company) {
		this.eventBusService.emitCompanySelectChange(company);
	}
}
