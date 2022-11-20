import { Pipe, PipeTransform } from '@angular/core';
import { TableColDef } from '../models/column-definition.model';

@Pipe({
  name: `columnValue`,
  standalone: true,
})
export class ColumnValuePipe implements PipeTransform {
  transform(element: any, columnDefinition: any) {
    if (columnDefinition.valueGetter) {
      return columnDefinition.valueGetter(element);
    }

    if (columnDefinition.field) {
      return element[columnDefinition.field];
    }
  }
}
