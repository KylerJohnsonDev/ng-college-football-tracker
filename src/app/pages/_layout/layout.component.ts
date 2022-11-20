import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { ConferencesStore } from './conferences.store';
import { LetModule } from '@ngrx/component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    LetModule,
  ],
  template: `
    <ng-container *ngrxLet="vm$; let vm">
      <mat-toolbar class="toolbar mat-elevation-z8" color="primary">
        <a routerLink="/">
          <h2>NCAA Football Tracker</h2>
        </a>
      </mat-toolbar>
      <main class="content-wrapper mat-elevation-z8">
        <mat-drawer-container class="layout-drawer-container">
          <mat-drawer mode="side" opened class="mat-drawer mat-elevation-z8">
            <mat-nav-list>
              <a mat-list-item routerLink="/conferences"
                >Conferences ({{ vm.conferencesCount }})</a
              >
              <a mat-list-item routerLink="/teams"
                >Teams ({{ vm.teamsCount }})</a
              >
              <a mat-list-item>CFP Rankings</a>
              <a mat-list-item>Team Matchup</a>
            </mat-nav-list>
          </mat-drawer>
          <mat-drawer-content>
            <router-outlet></router-outlet>
          </mat-drawer-content>
        </mat-drawer-container>
      </main>
    </ng-container>
  `,
  styles: [
    `
      :host {
        height: 100vh;

        .toolbar {
          height: 5vh;
          a {
            color: white;
            text-decoration: none;
          }
        }

        .router-link-active {
          color: blue !important;
        }

        .content-wrapper {
          height: 95vh;

          .layout-drawer-container {
            height: 100%;

            .mat-drawer {
              width: 12%;
            }
          }
        }
      }
    `,
  ],
})
export class LayoutComponent {
  readonly vm$ = this.conferencesStore.layoutVM$;
  constructor(private conferencesStore: ConferencesStore) {}
}
