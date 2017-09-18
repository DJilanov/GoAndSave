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

// Import services
import { Config } from './services/config';
import { XlsxService } from './services/XLSX.service';
import { BackendService } from './services/backend.service';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
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
		BackendService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
