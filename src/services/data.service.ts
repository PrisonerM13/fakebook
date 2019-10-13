import { IDataService } from '../models/IDataService';

const PORT = 4000;
const baseURL = `http://localhost:${PORT}`;
const apiURL = `${baseURL}/api`;
export const imagesURL = `${baseURL}/images`;

export default class DataService<T extends any> implements IDataService<T> {
  private _cache = new Map<number, T>();
  private _useCache = false;

  constructor(private _collectionName: string, private _idField: string = '') {
    this.useCache = true; // relevant only if _idField is not an empty string
  }

  public async getAll(): Promise<T[]> {
    if (this.useCache && this._cache.size > 0) {
      return [...this._cache.values()];
    }
    const response = await fetch(`${apiURL}/${this._collectionName}`);
    const data = await response.json();
    this.initCache(data);
    return data;
  }

  public async getById(id: number): Promise<T> {
    if (this.useCache && this._cache.has(id)) {
      return this._cache.get(id) as T;
    }
    const response = await fetch(`${apiURL}/${this._collectionName}/${id}`);
    const rec = await response.json();
    if (rec as T) {
      this._cache.set(rec[this._idField], rec);
    }
    return rec;
  }

  public async insert(data: FormData): Promise<T> {
    const response = await fetch(`${apiURL}/${this._collectionName}/`, {
      method: 'POST',
      body: data,
    });
    const rec = await response.json();
    if (rec as T) {
      this._cache.set(rec[this._idField], rec);
    }
    return rec;
  }

  public async update(id: number, data: FormData): Promise<T> {
    const response = await fetch(`${apiURL}/${this._collectionName}/${id}`, {
      method: 'PUT',
      body: data,
    });
    const rec = await response.json();
    if (rec as T) {
      this._cache.set(rec[this._idField], rec);
    }
    return rec;
  }

  public async remove(id: number): Promise<boolean> {
    const response = await fetch(`${apiURL}/${this._collectionName}/${id}`, {
      method: 'DELETE',
    });
    this._cache.delete(id);
    return response.json();
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
