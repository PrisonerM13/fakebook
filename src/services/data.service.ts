import { IDataService, IDType } from '../models/IDataService';

const baseURL = 'http://localhost:4000/api';

export const imagesBaseURL = 'http://localhost:4000/images';

export default class DataService<T> implements IDataService<T> {
  public getAll: () => Promise<T[]>;
  public getById: (id: IDType) => Promise<T>;
  public insert: (data: FormData) => Promise<T>;
  public update: (id: IDType, data: FormData) => Promise<any>;
  public remove: (id: IDType) => Promise<any>;
  constructor(collectionName: string) {
    this.getAll = getAll.bind(null, collectionName);
    this.getById = getById.bind(null, collectionName);
    this.insert = insert.bind(null, collectionName);
    this.update = update.bind(null, collectionName);
    this.remove = remove.bind(null, collectionName);
  }
}

async function getAll(collectionName: string): Promise<any[]> {
  return await fetch(`${baseURL}/${collectionName}`).then(res => res.json());
}

async function getById(collectionName: string, id: IDType): Promise<any> {
  return await fetch(`${baseURL}/${collectionName}/${id}`).then(res =>
    res.json(),
  );
}

async function insert(collectionName: string, data: FormData): Promise<any> {
  return await fetch(`${baseURL}/${collectionName}/`, {
    method: 'POST',
    body: data,
  }).then(res => res.json());
}

async function update(
  collectionName: string,
  id: IDType,
  data: FormData,
): Promise<any> {
  data.append('id', id.toString()); // add id to body
  return await fetch(`${baseURL}/${collectionName}/${id}`, {
    method: 'PUT',
    body: data,
  }).then(res => res.json());
}

async function remove(collectionName: string, id: IDType): Promise<any> {
  return await fetch(`${baseURL}/${collectionName}/${id}`, {
    method: 'DELETE',
  }).then(res => res.json());
}
