import React from 'react';
import { useInput } from '../hooks/useInput';
import { createPost } from '../services/posts.data.service';

const PostForm: React.FC = () => {
  const input = useInput();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(new Map([...formData.entries()]));
    onSubmit(data);
  };

  const onSubmit = (data: object) => {
    createPost(data);
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
