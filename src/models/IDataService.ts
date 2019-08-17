export type IDType = number | string;

export interface IDataService<T> {
  getAll: () => Promise<T[]>;
  getById: (id: IDType) => Promise<T>;
  insert: (data: object) => Promise<T>;
  update: (id: IDType, data: FormData) => Promise<any>;
  remove: (id: IDType) => Promise<any>;
}
