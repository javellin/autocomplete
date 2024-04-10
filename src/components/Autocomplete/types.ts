export interface AutocompleteConfig<T> {
  identifier: keyof T;
  displayField: keyof T;
  data?: T[] | null;
  fetchData?(search: string): Promise<T[]> | null;
}
