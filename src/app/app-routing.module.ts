import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { GridContainerComponent } from './components/grid-container/grid-container.component';
import { EditBrandsComponent } from './components/edit-brands/edit-brands.component';
import { EditStoresComponent } from './components/edit-stores/edit-stores.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/login',
		pathMatch: 'full'
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'grid',
		component: GridContainerComponent
	},
	{
		path: 'edit-brands',
		component: EditBrandsComponent
	},
	{
		path: 'edit-stores',
		component: EditStoresComponent
	},
	{
		path: 'analytics',
		component: AnalyticsComponent
	},
	{
		path: '**',
		redirectTo: '/login',
		pathMatch: 'full'
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: []
})
export class AppRoutingModule { }
