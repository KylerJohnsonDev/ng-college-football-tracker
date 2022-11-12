import { Routes } from '@angular/router';
import { DashboardComponent } from './app/pages/dashboard.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
];
