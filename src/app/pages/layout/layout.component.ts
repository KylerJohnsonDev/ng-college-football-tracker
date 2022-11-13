import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div class="toolbar">Home</div>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [],
})
export class LayoutComponent {}
