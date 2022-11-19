import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ConferencesState,
  ConferencesStore,
} from '../layout/conferences.store';
import { Observable } from 'rxjs';
import { LetModule } from '@ngrx/component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-conferences',
  standalone: true,
  imports: [CommonModule, MatCardModule, LetModule],
  template: `
    <ng-container *ngrxLet="vm$; let vm">
      <h2>Conferences</h2>
      <section>
        <mat-card *ngFor="let conference of vm.conferences">
          <mat-card-title>{{ conference.Name }}</mat-card-title>
        </mat-card>
      </section>
    </ng-container>
  `,
  styles: [],
})
export class ConferencesComponent {
  vm$: Observable<ConferencesState> = this.conferencesStore.conferencesState$;

  constructor(private conferencesStore: ConferencesStore) {}
}
