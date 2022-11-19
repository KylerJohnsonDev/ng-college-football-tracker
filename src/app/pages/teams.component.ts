import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LetModule } from '@ngrx/component';
import { ConferencesStore } from './_layout/conferences.store';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [
    CommonModule,
    LetModule,
    MatDividerModule,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
  template: `
    <main *ngrxLet="vm$; let vm">
      <h2 class="page-header">Teams</h2>
      <mat-divider class="divider"></mat-divider>
      <section class="teams-cards" *ngIf="!vm.loading; else loading">
        <mat-card *ngFor="let team of vm.teams">
          <mat-card-header>
            <mat-card-title>{{ team.School }}</mat-card-title>
          </mat-card-header>
        </mat-card>
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
export class TeamsComponent {
  readonly vm$ = this.conferencesStore.teamsVM$;
  constructor(private conferencesStore: ConferencesStore) {}
}
