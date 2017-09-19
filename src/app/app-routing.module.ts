import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { GridContainerComponent } from './components/grid-container/grid-container.component';

const routes: Routes = [
	// {
	// 	path: '',
	// 	redirectTo: '/login',
	// 	pathMatch: 'full'
	// },
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'grid',
		component: GridContainerComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: []
})
export class AppRoutingModule { }
