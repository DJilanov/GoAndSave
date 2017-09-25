import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Import components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { GridComponent } from './components/grid/grid.component';
import { GridContainerComponent } from './components/grid-container/grid-container.component';
import { AddCompanyComponent } from './components/add-company/add-company.component';
import { AddТоCompanyComponent } from './components/add-to-company/add-to-company.component';

// Import services
import { Config } from './services/config';
import { XlsxService } from './services/XLSX.service';
import { BackendService } from './services/backend.service';
import { EventBusService } from './services/event-bus.service';
import { ExcelDataService } from './services/excel-data.service';

@NgModule({
	declarations: [
		AppComponent,
		GridComponent,
		LoginComponent,
		AddCompanyComponent,
		AddТоCompanyComponent,
		GridContainerComponent
	],
	imports: [
		AppRoutingModule,
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		HttpModule
	],
	providers: [
		Config,
		XlsxService,
		BackendService,
		EventBusService,
		ExcelDataService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
