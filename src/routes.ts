import { Routes } from '@angular/router';
import { LayoutComponent } from './app/layout.component';
import { DashboardComponent } from './app/pages/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
    ],
  },
];
