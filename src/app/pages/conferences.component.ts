import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ConferencesState,
  ConferencesStore,
} from './_layout/conferences.store';
import { Observable } from 'rxjs';
import { LetModule } from '@ngrx/component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-conferences',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    LetModule,
    MatProgressSpinnerModule,
    MatDividerModule,
  ],
  template: `
    <main *ngrxLet="vm$; let vm">
      <h2 class="page-header">Conferences</h2>
      <mat-divider class="divider"></mat-divider>
      <section class="conference-cards" *ngIf="!vm.loading; else loading">
        <mat-card *ngFor="let conference of vm.conferences">
          <mat-card-header>
            <mat-card-title>{{ conference.Name }}</mat-card-title>
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
        padding: 1rem;

        .divider {
          margin-bottom: 1rem;
        }

        .loading-container {
          display: flex;
          flex-direction: row;
          justify-content: center;
          height: 100%;
        }

        .conference-cards {
          display: grid;
          gap: 1rem;
          grid-template-columns: repeat(4, 1fr);
        }
      }
    `,
  ],
})
export class ConferencesComponent {
  vm$: Observable<ConferencesState> = this.conferencesStore.conferencesState$;

  constructor(private conferencesStore: ConferencesStore) {}
}
