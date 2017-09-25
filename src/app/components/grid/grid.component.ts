import { Component } from '@angular/core';
import { XlsxService } from '../../services/XLSX.service';
import { BackendService } from '../../services/backend.service';
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

	constructor(
		private xlsxService: XlsxService,
		private backendService: BackendService,
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

	export(): void {
		this.backendService.uploadData({
			company: this.companyData,
			data: this.excelData
		})
	}
}
