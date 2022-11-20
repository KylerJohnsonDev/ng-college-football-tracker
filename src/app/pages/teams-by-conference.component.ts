import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { LetModule } from '@ngrx/component';
import { switchMap } from 'rxjs';
import { TeamsTableComponent } from '../components/teams-table.component';
import { ConferencesStore } from './_layout/conferences.store';

@Component({
  selector: 'app-teams-by-conference',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    LetModule,
    MatDividerModule,
    MatCardModule,
    MatProgressSpinnerModule,
    TeamsTableComponent,
  ],
  template: `
    <main *ngrxLet="vm$; let vm">
      <h2 class="page-header">{{ vm.conferenceName }}</h2>
      <mat-divider class="divider"></mat-divider>
      <section class="table-container" *ngIf="!vm.loading; else loading">
        <teams-table
          tableId="teams-by-conference-table"
          [loading]="vm.loading"
          [dataSource]="vm.teams"
          [totalCount]="vm.totalCount"
        ></teams-table>
      </section>
      <ng-template #loading>
        <div class="loading-container">
          <mat-spinner color="primary"></mat-spinner>
        </div>
      </ng-template>
    </main>
  `,
  styles: [
    `
      main {
        height: 100%;
        padding: 0 1rem 1rem 1rem;

        .divider {
          margin-bottom: 1rem;
        }

        .loading-container {
          height: 100%;
          display: flex;
          flex-direction: row;
          justify-content: center;
        }

        .teams-cards {
          display: grid;
          gap: 1rem;
          grid-template-columns: repeat(4, 1fr);
        }
      }
    `,
  ],
})
export class TeamsByConferenceComponent {
  vm$ = this.route.paramMap.pipe(
    switchMap((params: ParamMap) => {
      const conferenceId = params.get('conferenceId') ?? 0;
      return this.conferencesStore.teamsByConferenceVM$(+conferenceId);
    })
  );

  constructor(
    private route: ActivatedRoute,
    private conferencesStore: ConferencesStore
  ) {}
}
