import React, { useEffect, useState } from 'react';
import IPost from '../models/IPost';
import Loading from './Loading';
import Post from './Post';

const PostList: React.FC = () => {
  const [postList, setPostList] = useState<IPost[]>();

  useEffect(() => {
    const getData = async () => {
      setPostList(await getPostList());
    };
    getData();
  });

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

async function getPostList() {
  const result = await fetch('http://localhost:4000/api/posts');
  return await result.json();
}

export default PostList;
