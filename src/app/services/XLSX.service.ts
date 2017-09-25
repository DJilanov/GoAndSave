import { Injectable } from '@angular/core';
import { EventBusService } from './event-bus.service';

import * as XLSX from 'xlsx';

import { saveAs } from 'file-saver';

type AOA = Array<Array<any>>;

function s2ab(s: string): ArrayBuffer {
	const buf = new ArrayBuffer(s.length);
	const view = new Uint8Array(buf);
	for (let i = 0; i !== s.length; ++i) {
		view[i] = s.charCodeAt(i) & 0xFF;
	};
	return buf;
}

@Injectable()
export class XlsxService {
	data: AOA = [[1,2],[3,4]];
	wopts: XLSX.WritingOptions = { bookType:'xlsx', type:'binary' };
	fileName: string = "";

	constructor(
		private eventBusService: EventBusService
	) { }

	onFileChange(evt: any) {
		/* wire up file reader */
		const target: DataTransfer = <DataTransfer>(evt.target);
		if(target.files.length != 1) { throw new Error("Cannot upload multiple files on the entry") };
		const reader = new FileReader();
		reader.onload = (e: any) => {
			/* read workbook */
			const bstr = e.target.result;
			const wb = XLSX.read(bstr, {type:'binary'});

			/* grab first sheet */
			const wsname = wb.SheetNames[0];
			const ws = wb.Sheets[wsname];

			/* save data */
			this.data = <AOA>(XLSX.utils.sheet_to_json(ws, {header:1}));
			this.eventBusService.emitNewExcelData(this.data);
		};
		reader.readAsBinaryString(target.files[0]);
	}

	export(): void {
		/* generate worksheet */
		const ws = XLSX.utils.aoa_to_sheet(this.data);

		/* generate workbook and add the worksheet */
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

		/* save to file */
		const wbout = XLSX.write(wb, this.wopts);
		console.log(this.fileName);
		saveAs(new Blob([s2ab(wbout)]), this.fileName);
	}
}
