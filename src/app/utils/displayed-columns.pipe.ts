import { Pipe, PipeTransform } from '@angular/core';
import { TableColDef } from '../models/column-definition.model';

@Pipe({
  name: `displayedColumns`,
  standalone: true,
})
export class DisplayedColumnsPipe implements PipeTransform {
  transform(columnDefinitions: any[]) {
    return columnDefinitions
      .filter((def) => def.isDisplayed)
      .map((def) => def.field);
  }
}
