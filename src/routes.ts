import { Routes } from '@angular/router';
import { LayoutComponent } from './app/pages/layout/layout.component';
import { DashboardComponent } from './app/pages/dashboard/dashboard.component';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import {
  ConferencesEffects,
  conferencesFeature,
} from './app/pages/layout/conferences.store';
import { ConferencesService } from './app/pages/layout/conferences.service';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    providers: [
      ConferencesService,
      provideState(conferencesFeature),
      provideEffects(ConferencesEffects),
    ],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
    ],
  },
];
