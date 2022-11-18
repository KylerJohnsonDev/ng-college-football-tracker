import { Routes } from '@angular/router';
import { LayoutComponent } from './app/pages/layout/layout.component';
import { DashboardComponent } from './app/pages/dashboard/dashboard.component';
import { ConferencesService } from './app/pages/layout/conferences.service';
import { ConferencesStore } from './app/pages/layout/conferences.store';
import { provideComponentStore } from '@ngrx/component-store';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    providers: [ConferencesService, provideComponentStore(ConferencesStore)],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
    ],
  },
];
