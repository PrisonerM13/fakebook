import React from 'react';
import IPost from '../models/IPost';
import { imagesBaseURL } from '../services/data.service';

const Post: React.FC<IPost> = ({ text, createdAt, image }) => {
  return (
    <section className="post">
      <div>{text}</div>
      {createdAt && <div>
        {new Date(createdAt).toLocaleDateString('default', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })}
      </div>}
      {image && <img src={`${imagesBaseURL}/${image}`} alt={text}/>}
    </section>
  );
};

export default Post;
