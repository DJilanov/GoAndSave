import { Component, OnInit } from '@angular/core';
import { CachingService } from '../../services/caching.service';
import { BackendService } from '../../services/backend.service';
import { EventBusService } from '../../services/event-bus.service';

@Component({
	selector: 'app-brands-stores',
	templateUrl: './edit-brands.component.html',
	styleUrls: ['./edit-brands.component.scss']
})
export class EditBrandsComponent {
	public id = '';
	public brandName = '';
	public brandDefaultRadius = 50;
	public logoUrl = '';
	public logoFile = '';
	public notificationDefaultTitle = '';
	public notificationDefaultBody = '';

	public imagesArray = [];

	public selectedCompany = null;

	public updating: boolean = false;

	public companies;

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
		this.selectedCompany = company;
		this.brandName = company.brandName;
		this.brandDefaultRadius = company.brandDefaultRadius;
		this.logoUrl = company.logoUrl;
		this.notificationDefaultTitle = company.notificationDefaultTitle;
		this.notificationDefaultBody = company.notificationDefaultBody;

		this.imagesArray = company.imagesArray || [];
	}

	updateData() {
		this.updating = true;
		this.backendService.updateBrand(
			{
				brandName: this.brandName,
				brandDefaultRadius: this.brandDefaultRadius,
				notificationDefaultTitle: this.notificationDefaultTitle,
				notificationDefaultBody: this.notificationDefaultBody
			}, 
			this.imagesArray
		).then(response =>{
			this.updating = false;
			this.companies = response;
			this.cachingService.setCompanies(response);
		});
	}

	deleteBrand() {
		this.updating = true;
		this.backendService.deleteBrand(this.selectedCompany).then(response =>{
			this.backendService.getBrands().then(response => {
				this.updating = false;
				this.companies = response;
				this.cachingService.setCompanies(response);
			});
		});
	}

	onFileUpload(event) {
		let files = event.currentTarget.files;
		for(let fileCounter = 0; fileCounter < files.length; fileCounter++) {
			this.imagesArray.push(files[fileCounter]);
		}
	}
}
