import { Component, OnInit } from '@angular/core';
import { CachingService } from '../../services/caching.service';
import { BackendService } from '../../services/backend.service';
import { EventBusService } from '../../services/event-bus.service';

@Component({
	selector: 'app-analytics',
	templateUrl: './analytics.component.html',
	styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent {

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
	}

	onSelectBrand(company) {
		this.selectedBrand = company;
		this.backendService.getStoresByBrand(company).then(response =>{
			this.stores = response;
		});
	}
	
	onSelectStore(store) {
		this.selectedStore = store;
		this.storeName = store.storeName;
		this.storeAddress = store.storeAddress;
		this.customStoreRadius = store.customStoreRadius;
		this.lat = store.lat;
		this.lng = store.lng;
		this.logoFile = store.logoFile;
		this.notificationTitle = store.notificationTitle;
		this.notificationBody = store.notificationBody;
		this.promoStart = store.promoStart;
		this.promoEnd = store.promoEnd;
	}
}
