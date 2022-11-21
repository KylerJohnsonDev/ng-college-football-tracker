import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { LetModule } from '@ngrx/component';
import { switchMap } from 'rxjs';
import { TableColumnsToolComponent } from '../components/table-columns-tool.component';
import { TableLayoutComponent } from '../components/table-layout.component';
import { TableToolPanelLayoutComponent } from '../components/table-tool-panel-layout.component';
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
    TableLayoutComponent,
    TableToolPanelLayoutComponent,
    TableColumnsToolComponent,
  ],
  template: `
    <main *ngrxLet="vm$; let vm">
      <table-layout [hasToolPanel]="true">
        <section tableHeader class="table-header">
          <h2 class="page-header">{{ vm.conferenceName }}</h2>
          <p tableHeader>{{ vm.totalCount }} Results</p>
        </section>
        <teams-table
          table
          tableId="teams-by-conference-table"
          [loading]="vm.loading"
          [dataSource]="vm.teams"
          [totalCount]="vm.totalCount"
        ></teams-table>
      </table-layout>
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

        .table-header {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: flex-end;

          h2 {
            margin: 0 0 1rem 0;
          }
        }

        .loading-container {
          height: 100%;
          display: flex;
          flex-direction: row;
          justify-content: center;
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
