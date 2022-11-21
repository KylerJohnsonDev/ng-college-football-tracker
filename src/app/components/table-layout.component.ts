import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'table-layout',
  standalone: true,
  imports: [NgIf, MatDividerModule],
  template: `
    <section class="table-layout mat-elevation-z8">
      <!-- <section class="table-layout__column-panel" *ngIf="hasToolPanel">
        <ng-content select="[columnPanel]"></ng-content>
      </section> -->
      <section class="table-layout__table-container">
        <section class="table-layout__table-container--header">
          <ng-content select="[tableHeader]"></ng-content>
        </section>
        <section class="table-layout__table-container--header">
          <ng-content select="[table]"></ng-content>
        </section>
      </section>
    </section>
  `,
  styles: [
    `
      .table-layout {
        display: flex;
        flex-direction: row;
        border-radius: 5px;
        padding: 1rem;

        &__column-panel {
          flex: 0 18rem;
        }

        &__table-container {
          flex: 100%;
        }
      }
    `,
  ],
})
export class TableLayoutComponent {
  @Input() hasToolPanel!: boolean;
}
