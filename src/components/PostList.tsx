import React from 'react';
import IPost from '../models/IPost';
import Loading from './Loading';
import Post from './Post';

// const dataService = new DataService<IPost>('posts');

const PostList: React.FC<{ postList: IPost[] }> = ({ postList }) => {
  if (!postList) {
    return <Loading />;
  }

  return (
    <section className="post-list">
      {postList.map(post => (
        <Post key={post.id} {...post} />
      ))}
    </section>
  );
};

export default PostList;
