import { Routes } from '@angular/router';
import { LayoutComponent } from './app/pages/layout/layout.component';
import { ConferencesComponent } from './app/pages/conferences/conferences.component';
import { ConferencesService } from './app/pages/layout/conferences.service';
import { ConferencesStore } from './app/pages/layout/conferences.store';
import { provideComponentStore } from '@ngrx/component-store';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    providers: [ConferencesService, provideComponentStore(ConferencesStore)],
    children: [
      { path: 'conferences', component: ConferencesComponent },
      { path: '', pathMatch: 'full', redirectTo: '/conferences' },
    ],
  },
];
