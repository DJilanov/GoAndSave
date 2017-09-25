import { Injectable, EventEmitter } from '@angular/core';
import { EventBusService } from './event-bus.service';

@Injectable()

/**
 * @ExcelDataService used for connections between modules
 */
export class ExcelDataService {

    public excelData: Array<object> = [];

    constructor(
        private eventBusService: EventBusService
    ) {
        this.eventBusService.excelDataEmitter.subscribe((data) => this.addExcelData(data));
    }

    public resetExcelData() {
        this.excelData = []
        this.eventBusService.emitExcelDataChange(this.excelData);
    }
    
    public changeExcelData(data) {
        this.excelData = data;
        this.eventBusService.emitExcelDataChange(this.excelData);
    }
    
    public addExcelData(data) {
        for(let newExcelObjectCounter = 0; newExcelObjectCounter < data.length; newExcelObjectCounter++) {
            this.excelData.push(data[newExcelObjectCounter]);
        }
        this.eventBusService.emitExcelDataChange(this.excelData);
    }
    
    public removeExcelDataRow(dataRow) {
        // TODO: remove element from the array
        this.eventBusService.emitExcelDataChange(this.excelData);
    }

    public getData() {
        return this.excelData;
    }
}
