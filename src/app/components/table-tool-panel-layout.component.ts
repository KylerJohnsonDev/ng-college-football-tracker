import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'table-tool-panel-layout',
  standalone: true,
  imports: [NgIf, MatDividerModule],
  template: `
    <section class="tool-panel">
      <section class="tool-panel-bar">
        <ng-content [panelIcons]></ng-content>
      </section>
      <section class="panel-content" *ngIf="isExpanded">
        <ng-content [panelContent]></ng-content>
      </section>
    </section>
  `,
  styles: [
    `
      :host {
        .tool-panel {
          height: 100%;
        }
      }
    `,
  ],
})
export class TableToolPanelLayoutComponent {
  @Input() isExpanded!: boolean;
}
