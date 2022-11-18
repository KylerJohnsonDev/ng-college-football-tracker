import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ConferencesStore } from './conferences.store';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatSidenavModule],
  template: `
    <div class="toolbar">
      <h2>NCAA Football Tracker</h2>
    </div>
    <main class="content-wrapper">
      <mat-drawer-container class="example-container">
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

        .content-wrapper {
          height: 100%;
          display: flex;
          flex-direction: row;
        }
      }
    `,
  ],
})
export class LayoutComponent {}
