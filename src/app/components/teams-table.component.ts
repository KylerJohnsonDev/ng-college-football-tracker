import { CommonModule } from '@angular/common';
import { Component, Input, TrackByFunction } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Team } from '../models/team.model';
import { TableColDef } from '../models/column-definition.model';
import { DisplayedColumnsPipe } from '../utils/displayed-columns.pipe';
import { ColumnValuePipe } from '../utils/column-value.pipe';

@Component({
  selector: 'teams-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    DisplayedColumnsPipe,
    ColumnValuePipe,
  ],
  template: `
    <table mat-table [dataSource]="dataSource" [trackBy]="tableTrackBy">
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
  `,
  styles: [
    `
      :host {
        width: 100%;
        height: 100%;

        table {
          width: 100%;
          border: 1px solid lightgray;
          border-radius: 5px;

          tr:nth-child(odd) {
            background-color: whitesmoke;
          }
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
}
