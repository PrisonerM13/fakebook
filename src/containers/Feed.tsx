import React from 'react';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';

const Feed: React.FC = () => {
  return (
    <section className="feed">
      <PostForm />
      <PostList />
    </section>
  );
};

export default Feed;
