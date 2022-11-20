import { Routes } from '@angular/router';
import { LayoutComponent } from './app/pages/_layout/layout.component';
import { ConferencesComponent } from './app/pages/conferences.component';
import { ConferencesService } from './app/pages/_layout/conferences.service';
import { ConferencesStore } from './app/pages/_layout/conferences.store';
import { provideComponentStore } from '@ngrx/component-store';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    providers: [ConferencesService, provideComponentStore(ConferencesStore)],
    children: [
      { path: 'conferences', component: ConferencesComponent },
      {
        path: 'teams-by-conference/:conferenceId',
        loadComponent: () =>
          import('./app/pages/teams-by-conference.component').then(
            (c) => c.TeamsByConferenceComponent
          ),
      },
      {
        path: 'teams',
        loadComponent: () =>
          import('./app/pages/teams.component').then((c) => c.TeamsComponent),
      },
      { path: '', pathMatch: 'full', redirectTo: '/conferences' },
    ],
  },
];
