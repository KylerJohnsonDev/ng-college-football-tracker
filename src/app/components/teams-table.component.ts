import { CommonModule } from '@angular/common';
import { Component, Input, TrackByFunction } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Team } from '../models/team.model';
import { TableColDef } from '../models/column-definition.model';
import { DisplayedColumnsPipe } from '../utils/displayed-columns.pipe';
import { ColumnValuePipe } from '../utils/column-value.pipe';
import { TableColumnsToolComponent } from './table-columns-tool.component';
import { TableToolPanelLayoutComponent } from './table-tool-panel-layout.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'teams-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    DisplayedColumnsPipe,
    ColumnValuePipe,
    TableToolPanelLayoutComponent,
    TableColumnsToolComponent,
    MatIconModule,
    MatDividerModule,
  ],
  template: `
    <div class="table-section">
      <!-- <table-tool-panel-layout [isExpanded]="true">
        <table-columns-tool
          [columnDefinitions]="columnDefinitions"
        ></table-columns-tool>
      </table-tool-panel-layout> -->
      <div class="tool-panel-bar">
        <mat-icon
          [ngClass]="{ 'column-panel-expanded': toolPanelExpanded }"
          aria-label="toggle panels"
          (click)="toolPanelExpanded = !toolPanelExpanded"
          >width_normal</mat-icon
        >
      </div>
      <mat-divider vertical="true"></mat-divider>
      <table-columns-tool
        *ngIf="toolPanelExpanded"
        [columnDefinitions]="columnDefinitions"
        (columnConfigurationChange)="onColumnConfigurationChange($event)"
      ></table-columns-tool>
      <mat-divider *ngIf="toolPanelExpanded" vertical="true"></mat-divider>
      <table
        class="table"
        mat-table
        [dataSource]="dataSource"
        [trackBy]="tableTrackBy"
      >
        <ng-container
          *ngFor="let colDef of columnDefinitions; trackBy: columnTrackBy"
          matColumnDef="{{ colDef.field }}"
        >
          <ng-container [ngSwitch]="colDef.field">
            <ng-container *ngSwitchDefault>
              <th mat-header-cell *matHeaderCellDef>{{ colDef.headerText }}</th>
              <td mat-cell *matCellDef="let element">
                {{ element | columnValue: colDef }}
              </td>
            </ng-container>
          </ng-container>
        </ng-container>

        <tr
          class="alt-row header-row"
          mat-header-row
          *matHeaderRowDef="columnDefinitions | displayedColumns"
        ></tr>
        <tr
          mat-row
          *matRowDef="let row; columns: columnDefinitions | displayedColumns"
        ></tr>
      </table>
    </div>
  `,
  styles: [
    `
      .table-section {
        display: flex;
        flex-direction: row;
        border: 1px solid lightgray;
        border-radius: 0.375rem;

        .tool-panel-bar {
          mat-icon {
            display: block;
            border-bottom: 1px solid lightgray;
            border-top-left-radius: 5px;
            font-size: 1.1rem;
            height: 1.33rem;
            padding: 0.75rem 0.25rem;
            text-align: center;

            /* &:hover {
              background-color: ;
              color: $color-light-theme-interactive-primary-hover;
              cursor: pointer;
            } */

            &.column-panel-expanded {
              /* background-color: $color-light-theme-interactive-selected;
              color: $color-light-theme-interactive-active;

              &:hover {
                background-color: $color-light-theme-interactive-secondary-hover;
              } */
            }
          }
        }
        .columns-tool {
          display: none;
        }
      }
    `,
  ],
})
export class TeamsTableComponent {
  @Input() tableId!: string;
  @Input() totalCount!: number;
  @Input() dataSource: Team[] = [];
  @Input() loading!: boolean;

  toolPanelExpanded = false;

  columnDefinitions: TableColDef<Team>[] = [
    {
      field: 'team',
      headerText: 'Team',
      isDisplayed: true,
      valueGetter: (team) => `${team.School} ${team.Name}`,
    },
    {
      field: 'overall',
      headerText: 'Overall',
      isDisplayed: true,
      valueGetter: (team) => `${team.Wins}-${team.Losses}`,
    },
    {
      field: 'conference',
      headerText: 'Conference',
      isDisplayed: true,
      valueGetter: (team) => `${team.ConferenceWins}-${team.ConferenceLosses}`,
    },
    {
      field: 'ApRank',
      headerText: 'AP Rank',
      isDisplayed: true,
    },
    {
      field: 'CoachesRank',
      headerText: 'Coaches Rank',
      isDisplayed: true,
    },
    {
      field: 'PlayoffRank',
      headerText: 'CFP Rank',
      isDisplayed: true,
    },
  ];

  tableTrackBy(index: number, rowItem: Team): number {
    return rowItem.TeamID;
  }

  columnTrackBy(index: number, item: TableColDef<Team>): string {
    return item.field;
  }

  onColumnConfigurationChange(columnDefinitions: TableColDef<Team>[]): void {
    this.columnDefinitions = columnDefinitions;
  }
}
