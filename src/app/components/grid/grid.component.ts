import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { XlsxService } from '../../services/XLSX.service';
import { BackendService } from '../../services/backend.service';
import { CachingService } from '../../services/caching.service';
import { EventBusService } from '../../services/event-bus.service';
import { ExcelDataService } from '../../services/excel-data.service';

@Component({
	selector: 'app-grid',
	templateUrl: './grid.component.html',
	styleUrls: ['./grid.component.scss']
})

export class GridComponent {

	public excelData: Array<Object> = [];
	public companyData: Object = {};
	public companies: Array<Object> = [];

	constructor(
		private router: Router,
		private xlsxService: XlsxService,
		private backendService: BackendService,
		private cachingService: CachingService,
		private eventBusService: EventBusService,
		private excelDataService: ExcelDataService
	) {
		// if(!backendService.isLogged()) {
		// 	router.navigate(['/login']);
		// }
        this.eventBusService.excelDataChangeEmitter.subscribe((data) => this.updateExcelData(data));
        this.eventBusService.companySelectEmitter.subscribe((data) => this.updateCompanyData(data));
	}

	updateExcelData(data) {
		this.excelData = data;
	}

	updateCompanyData(data) {
		this.companyData = data;
	}

	onFileChange(evt: any) {
		this.xlsxService.onFileChange(evt);
	}

	checkIsNewBrand() {
		this.companies = this.cachingService.getCompanies();
		let selectedBrand = this.companies.filter((brand) => {
			return brand['brandName'] == this.companyData['brandName'] && 
				brand['brandDefaultRadius'] == this.companyData['brandDefaultRadius'] && 
				brand['notificationDefaultTitle'] == this.companyData['notificationDefaultTitle'] && 
				brand['notificationDefaultBody'] == this.companyData['notificationDefaultBody']
		})
		if(!selectedBrand.length) {
			this.companyData['new'] = true;
		}
	}

	export(): void {
		this.checkIsNewBrand();
		this.backendService.postBrandAndStores({
			brand: this.companyData,
			stores: this.excelData
		}).then((response) => {
			alert('success');
			this.backendService.getBrands().then(response =>{
				this.companies = response;
				this.cachingService.setCompanies(response);
			});
		})
	}
}
