import { Injectable, EventEmitter } from '@angular/core';

@Injectable()

/**
 * @EventBusService used for connections between modules
 */
export class EventBusService {

    public excelDataEmitter: EventEmitter<any>;
    public companySelectEmitter: EventEmitter<any>;
    public excelDataChangeEmitter: EventEmitter<any>;

    constructor() {
        this.excelDataEmitter = new EventEmitter();
        this.companySelectEmitter = new EventEmitter();
        this.excelDataChangeEmitter = new EventEmitter();
    }

    public emitNewExcelData(data) {
        this.excelDataEmitter.emit(data);
    }

    public emitCompanySelectChange(data) {
        this.companySelectEmitter.emit(data);
    }

    public emitExcelDataChange(data) {
        this.excelDataChangeEmitter.emit(data);
    }
}
