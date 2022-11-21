import { Component, EventEmitter, Input, Output } from '@angular/core';

import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { TableColDef } from '../models/column-definition.model';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgFor, NgIf } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'table-columns-tool',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    DragDropModule,
    MatIconModule,
    MatCheckboxModule,
    MatDividerModule,
  ],
  template: `
    <div class="columns-tool-panel">
      <div class="columns-tool-panel__header">Columns</div>
      <mat-divider></mat-divider>
      <div
        class="columns-tool-panel__options-container"
        cdkDropList
        [cdkDropListData]="columnDefinitions"
        (cdkDropListDropped)="drop($event, columnDefinitions)"
      >
        <div
          *ngFor="let colDef of columnDefinitions"
          cdkDrag
          class="columns-tool-panel__options-container--option"
        >
          <mat-icon>drag_indicator</mat-icon>
          <mat-checkbox
            color="primary"
            [checked]="colDef.isDisplayed"
            (change)="colDefDisplayChange(colDef.field)"
          ></mat-checkbox>
          {{ colDef.headerText }}
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .columns-tool-panel {
        width: 13rem;

        &__header {
          font-size: 1.25rem;
          padding: 0.75rem 1.5rem;
        }

        &__options-container {
          &--option {
            display: flex;
            flex-direction: row;
            align-items: center;
          }
        }
      }
    `,
  ],
})
export class TableColumnsToolComponent {
  @Input() columnDefinitions: any[] = [];

  @Output() columnConfigurationChange = new EventEmitter<TableColDef<any>[]>();

  colDefDisplayChange(columnField: string): void {
    const colDefsCopy: TableColDef<any>[] = [...this.columnDefinitions];
    const colDefIndexToUpdate = this.columnDefinitions.findIndex(
      (def) => def.field === columnField
    );
    colDefsCopy[colDefIndexToUpdate].isDisplayed =
      !colDefsCopy[colDefIndexToUpdate].isDisplayed;
    colDefsCopy.splice(colDefIndexToUpdate, 0);
    this.columnConfigurationChange.emit(colDefsCopy);
  }

  drop(event: CdkDragDrop<any[]>, columnDefinitions: TableColDef<any>[]) {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
    const colDefsCopy = [...columnDefinitions];
    this.columnConfigurationChange.emit(colDefsCopy);
  }
}
