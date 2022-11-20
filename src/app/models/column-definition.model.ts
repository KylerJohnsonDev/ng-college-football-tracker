export interface TableColDef<T> {
  field: string;
  headerText: string;
  isDisplayed: boolean;
  valueGetter?: (rowItem: T) => string;
}
