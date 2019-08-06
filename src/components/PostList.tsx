import React, { useState, useRef } from 'react';
import IPost from '../models/IPost';
import Loading from './Loading';
import Post from './Post';

const PostList: React.FC = () => {
  const [postList, setPostList] = useState<IPost[]>();
  const isLoading = useRef(false);

  async function loadData() {
    isLoading.current = true;
    setPostList(await getPostList());
    isLoading.current = false;
  }

  if (!postList) {
    if (!isLoading.current) {
      loadData();
    }
    return <Loading />;
  }

  return (
    <section className="feed">
      <header>Feed</header>
      <div className="post-list">
        {postList.map(post => (
          <Post key={post.id} {...post} />
        ))}
      </div>
    </section>
  );
};

async function getPostList() {
  const result = await fetch('http://localhost:4000/api/posts');
  return await result.json();
}

export default PostList;
