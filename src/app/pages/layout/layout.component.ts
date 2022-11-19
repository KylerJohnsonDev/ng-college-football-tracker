import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    MatToolbarModule,
    MatSidenavModule,
  ],
  template: `
    <mat-toolbar class="toolbar" color="primary">
      <a routerLink="/">
        <h2>NCAA Football Tracker</h2>
      </a>
    </mat-toolbar>
    <main class="content-wrapper mat-elevation-z8">
      <mat-drawer-container class="layout-drawer-container">
        <mat-drawer mode="side" opened>
          <h2>Football Tracker</h2>
        </mat-drawer>
        <mat-drawer-content>
          <router-outlet></router-outlet>
        </mat-drawer-content>
      </mat-drawer-container>
    </main>
  `,
  styles: [
    `
      :host {
        height: 100%;

        .toolbar {
          a {
            color: white;
            text-decoration: none;
          }
        }

        .content-wrapper {
          height: 100%;

          .layout-drawer-container {
            height: 100%;
          }
        }
      }
    `,
  ],
})
export class LayoutComponent {}
