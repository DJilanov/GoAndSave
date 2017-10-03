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

	public companies: Array<Object> = [];

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
        this.eventBusService.fetchedNewCompanies.subscribe((data) => {
			this.companies = this.cachingService.getCompanies();
		});
	}

	onSelect(company) {
		this.eventBusService.emitCompanySelectChange(company);
	}
}
