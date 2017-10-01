import { Component, OnInit } from '@angular/core';
import { EventBusService } from '../../services/event-bus.service';

@Component({
	selector: 'app-add-company',
	templateUrl: './add-company.component.html',
	styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent {
	public id = '';
	public brandName = '';
	public brandDefaultRadius = 50;
	public logoUrl = '';
	public logoFile = '';
	public notificationDefaultTitle = '';
	public notificationDefaultBody = '';

	public disableCompany = false;

	constructor(
		private eventBusService: EventBusService
	) {
        this.eventBusService.companySelectEmitter.subscribe((data) => this.updateCompanyData(data));
	}

	updateCompanyData(data) {
		this.brandName = data.brandName;
		this.brandDefaultRadius = data.brandDefaultRadius;
		this.logoUrl = data.logoUrl;
		this.notificationDefaultTitle = data.notificationDefaultTitle;
		this.notificationDefaultBody = data.notificationDefaultBody;
		if(data !== 'null') {
			this.disableCompany = true;
		} else {
			this.disableCompany = false;
		}
	}

	updateCompany() {
		this.disableCompany = true;
		this.eventBusService.emitCompanySelectChange({
			id: this.id,
			brandName: this.brandName,
			brandDefaultRadius: this.brandDefaultRadius,
			logoUrl: this.logoUrl,
			notificationDefaultTitle: this.notificationDefaultTitle,
			notificationDefaultBody: this.notificationDefaultBody,
			newCompany: true
		});
	}

	enableEdit() {
		this.disableCompany = false;
	}
}
