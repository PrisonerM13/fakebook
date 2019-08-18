import React, { useEffect, useRef, useState } from 'react';
import { Redirect, RouteComponentProps, withRouter } from 'react-router';
import TextareaAutosize from 'react-textarea-autosize';
import { dataService } from '../App';
import IPost from '../models/IPost';
import { imagesBaseURL } from '../services/data.service';

interface IProps {
  onSubmit: (post: IPost) => void;
}
const PostForm: React.FC<IProps & RouteComponentProps<{ id: string }>> = ({
  onSubmit,
  match,
}) => {
  const [post, setPost] = useState<IPost>();
  const [text, setText] = useState('');
  const [file, setFile] = useState('');
  const [isUpdateDone, setIsUpdateDone] = useState(false);
  // get data on mount
  useEffect(() => {
    const getPost = async (id: number) => {
      dataService.getById(id).then(data => {
        setPost(data);
        setText(data.text);
      });
    };
    if (match.params.id) {
      getPost(parseInt(match.params.id));
    }
  }, [match.params.id]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.target as HTMLFormElement;
    const formData = new FormData(formElement);
    if (post) {
      await dataService.update(post.id, formData);
      setIsUpdateDone(true);
    } else {
      formData.append('createdAt', new Date().toISOString());
      const newPost = await dataService.insert(formData);
      formElement.reset();
      setText('');
      onSubmit(newPost);
    }
  };

  const onTextChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const element = event.target as HTMLTextAreaElement;
    setText(element.value);
  };

  const onFileChange = (event: React.FormEvent<HTMLInputElement>) => {
    const element = event.target as HTMLInputElement;
    setFile(element.value);
  };

  if (isUpdateDone) {
    return <Redirect push={true} to={`/`} />;
  }

  return (
    <form className="post-form" autoComplete="off" onSubmit={handleSubmit}>
      {post ? <header>Edit Post</header> : <header>Create Post</header>}
      <TextareaAutosize
        name="text"
        minRows={5}
        maxRows={10}
        autoFocus={true}
        spellCheck={true}
        useCacheForDOMMeasurements={true}
        placeholder="Enter your text here..."
        value={text}
        onChange={onTextChange}
      />
      {post && post.image && (
        <img src={`${imagesBaseURL}/${post.image}`} alt={post.text} />
      )}
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={onFileChange}
      />
      <button
        type="submit"
        disabled={!((post ? post.text !== text : text !== '') || file !== '')}
      >
        Submit
      </button>
    </form>
  );
};

export default withRouter(PostForm);
