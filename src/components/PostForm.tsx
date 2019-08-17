import React from 'react';
import { useInput } from '../hooks/useInput';
import IPost from '../models/IPost';
import DataService from '../services/data.service';

const dataService = new DataService<IPost>('posts');

interface IProps {
  onSubmit: (post: IPost) => void;
}
const PostForm: React.FC<IProps> = ({ onSubmit }) => {
  const input = useInput();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(new Map([...formData.entries()]));
    const post = await dataService.insert(data);
    onSubmit(post);
  };

  return (
    <form className="post-form" autoComplete="off" onSubmit={handleSubmit}>
      <header>Create Post</header>
      <textarea
        name="text"
        placeholder="enter your input here..."
        autoFocus={true}
        {...input}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default PostForm;
