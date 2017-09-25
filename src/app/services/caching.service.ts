import { Injectable, EventEmitter } from '@angular/core';
import { EventBusService } from './event-bus.service';

@Injectable()

/**
 * @CachingService used for connections between modules
 */
export class CachingService {

    public companies: Array<object> = [];

    constructor(
        private eventBusService: EventBusService
    ) {
        this.eventBusService.excelDataEmitter.subscribe((data) => this.resetExcelData());
    }

    public resetExcelData() {
        this.companies = []
        this.eventBusService.emitExcelDataChange(this.companies);
    }
}
