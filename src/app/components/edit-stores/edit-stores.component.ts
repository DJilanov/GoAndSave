import { Component, OnInit } from '@angular/core';
import { CachingService } from '../../services/caching.service';
import { BackendService } from '../../services/backend.service';
import { EventBusService } from '../../services/event-bus.service';

@Component({
	selector: 'app-edit-stores',
	templateUrl: './edit-stores.component.html',
	styleUrls: ['./edit-stores.component.scss']
})
export class EditStoresComponent {
	public storeName = '';
	public storeAddress = '';
	public customStoreRadius = 50;
	public lat = '';
	public lng = '';
	public logoFile = '';
	public notificationTitle = '';
	public notificationBody = '';
	public promoStart = new Date();
	public promoEnd = new Date();

	public selectedBrand = null;

	public selectedStore = null;

	public success = false;
	public error = false;

	public updating: boolean = false;

	public companies: Array<Object> = [];
	public stores: Array<Object> = [];

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

	updateData() {
		this.updating = true;
		this.backendService.updateStore({
			_id: this.selectedStore._id,
			brandId: this.selectedStore.brandId,
			storeName: this.storeName,
			storeAddress: this.storeAddress,
			customStoreRadius: this.customStoreRadius,
			lat: this.lat,
			lng: this.lng,
			notificationTitle: this.notificationTitle,
			notificationBody: this.notificationBody,
			promoStart: this.promoStart,
			promoEnd: this.promoEnd
		}).then(response =>{
			this.updating = false;
			this.success = true;
			// TODO: CHECK FOR ERRORS
		});
	}

	deleteStore() {
		this.updating = true;
		this.backendService.deleteStore(this.selectedStore).then(response =>{
			this.updating = false;
			this.success = true;
			this.selectedStore = null;
			// TODO: CHECK FOR ERRORS
		});
	}
}
