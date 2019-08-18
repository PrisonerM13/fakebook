import { IDataService } from '../models/IDataService';

const baseURL = 'http://localhost:4000/api';
export const imagesBaseURL = 'http://localhost:4000/images';

export default class DataService<T extends { [x: string]: any }>
  implements IDataService<T> {
  public static async getAll<T>(
    this: DataService<any>,
    collectionName: string,
  ): Promise<T[]> {
    if (this.useCache && this._cache.size > 0) {
      return [...this._cache.values()];
    }
    const response = await fetch(`${baseURL}/${collectionName}`);
    const data = await response.json();
    this.initCache(data);
    return data;
  }

  public static async getById<T>(
    this: DataService<T>,
    collectionName: string,
    id: number,
  ): Promise<T> {
    if (this.useCache && this._cache.has(id)) {
      return this._cache.get(id) as T;
    }
    const response = await fetch(`${baseURL}/${collectionName}/${id}`);
    const rec = await response.json();
    if (rec as T) {
      this._cache.set(id, rec);
    }
    return rec;
  }

  public static async insert<T>(
    this: DataService<T>,
    collectionName: string,
    data: FormData,
  ): Promise<T> {
    const response = await fetch(`${baseURL}/${collectionName}/`, {
      method: 'POST',
      body: data,
    });
    const rec = await response.json();
    if (rec as T) {
      this._cache.set(rec[this._idField], rec);
    }
    return rec;
  }

  public static async update<T>(
    this: DataService<T>,
    collectionName: string,
    id: number,
    data: FormData,
  ): Promise<T> {
    const response = await fetch(`${baseURL}/${collectionName}/${id}`, {
      method: 'PUT',
      body: data,
    });
    const rec = await response.json();
    if (rec as T) {
      this._cache.set(id, rec);
    }
    return rec;
  }

  public static async remove<T>(
    this: DataService<T>,
    collectionName: string,
    id: number,
  ): Promise<boolean> {
    const response = await fetch(`${baseURL}/${collectionName}/${id}`, {
      method: 'DELETE',
    });
    this._cache.delete(id);
    return response.json();
  }

  public getAll: () => Promise<T[]>;
  public getById: (id: number) => Promise<T>;
  public insert: (data: FormData) => Promise<T>;
  public update: (id: number, data: FormData) => Promise<T>;
  public remove: (id: number) => Promise<boolean>;

  private _cache = new Map<number, T>();
  private _useCache = false;

  constructor(collectionName: string, private _idField: string = '') {
    this.getAll = DataService.getAll.bind(this, collectionName) as () => Promise<T[]>;
    this.getById = DataService.getById.bind(this, collectionName) as (id: number) => Promise<T>;
    this.insert = DataService.insert.bind(this, collectionName) as (data: FormData) => Promise<T>;
    this.update = DataService.update.bind(this, collectionName) as (id: number, data: FormData) => Promise<T>;
    this.remove = DataService.remove.bind(this, collectionName) as (id: number) => Promise<boolean>;
    this.useCache = true; // relevant only if _idField is not an empty string
  }

  get useCache() {
    return this._useCache;
  }
  set useCache(value: boolean) {
    this._useCache = this._idField !== '' && value;
  }

  private initCache(data: T[]) {
    if (this._idField) {
      this._cache.clear();
      data.forEach(rec => this._cache.set(rec[this._idField], rec));
    }
  }
}
