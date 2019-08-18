export interface IDataService<T> {
  getAll: () => Promise<T[]>;
  getById: (id: number) => Promise<T>;
  insert: (data: FormData) => Promise<T>;
  update: (id: number, data: FormData) => Promise<T>;
  remove: (id: number) => Promise<boolean>;
}
