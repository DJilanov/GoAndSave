import { Component } from '@angular/core';
import { XlsxService } from '../../services/XLSX.service';
import { BackendService } from '../../services/backend.service';

@Component({
	selector: 'app-grid',
	templateUrl: './grid.component.html',
	styleUrls: ['./grid.component.scss']
})

export class GridComponent {

	constructor(
		private xlsxService: XlsxService,
		private backendService: BackendService
	) {
		// if(!backendService.isLogged()) {
		// 	router.navigate(['/login']);
		// }
	}

	onFileChange(evt: any) {
		this.xlsxService.onFileChange(evt);
	}

	export(): void {
		this.xlsxService.export();
	}
}
