import IPost from '../models/IPost';

const baseURL = 'http://localhost:4000/api';

export async function getAllPosts(): Promise<IPost> {
  return await fetch(`${baseURL}/posts`).then(res => res.json());
}

export async function getPost(id: number): Promise<IPost> {
  return await fetch(`${baseURL}/posts/${id}`).then(res => res.json());
}

export async function createPost(data: object): Promise<IPost> {
  return await fetch(`${baseURL}/posts/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(res => res.json());
}

export async function updatePost(id: number, data: FormData): Promise<IPost> {
  data.append('id', id.toString()); // add id to body
  return await fetch(`${baseURL}/posts/${id}`, {
    method: 'PUT',
    body: data,
  }).then(res => res.json());
}

export async function deletePost(id: number): Promise<boolean> {
  return await fetch(`${baseURL}/posts/${id}`, {
    method: 'DELETE',
  }).then(res => res.json());
}
