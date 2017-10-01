import { Component, OnInit } from '@angular/core';
import { CachingService } from '../../services/caching.service';
import { BackendService } from '../../services/backend.service';
import { EventBusService } from '../../services/event-bus.service';

@Component({
	selector: 'app-add-to-company',
	templateUrl: './add-to-company.component.html',
	styleUrls: ['./add-to-company.component.scss']
})
export class AddТоCompanyComponent {

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
		private cachingService: CachingService,
		private backendService: BackendService,
		private eventBusService: EventBusService
	) {
		this.companies = this.cachingService.getCompanies();
		if(!this.companies.length) {
			this.backendService.getBrands().then(response =>{
				this.companies = response;
				this.cachingService.setCompanies(response);
			});
		}
	}

	onSelect(company) {
		this.eventBusService.emitCompanySelectChange(company);
	}
}
