import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
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
    const formElement = event.target as HTMLFormElement;
    const formData = new FormData(formElement);
    const post = await dataService.insert(formData);
    formElement.reset();
    input.setValue('');
    onSubmit(post);
  };

  return (
    <form className="post-form" autoComplete="off" onSubmit={handleSubmit}>
      <header>Create Post</header>
      <TextareaAutosize
        name="text"
        minRows={5}
        maxRows={10}
        autoFocus={true}
        spellCheck={true}
        useCacheForDOMMeasurements={true}
        placeholder="Enter your text here..."
        {...input}
      />
      <input type="file" name="image" accept="image/*" />
      <button type="submit" disabled={input.value ? false : true}>
        Submit
      </button>
    </form>
  );
};

export default PostForm;
