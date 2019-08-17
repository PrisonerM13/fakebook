import React, { useEffect, useState } from 'react';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import IPost from '../models/IPost';
import DataService from '../services/data.service';

const dataService = new DataService<IPost>('posts');

const Feed: React.FC = () => {
  const [postList, setPostList] = useState<IPost[]>([]);

  useEffect(() => {
    const getData = async () => {
      const posts = await dataService.getAll();
      // sort in descending order
      posts.sort((post1, post2) => post2.id - post1.id);
      setPostList(posts);
    };
    if (!postList || postList.length === 0) {
      getData();
    }
  }, [postList]);

  const onNewPost = (newPost: IPost) => {
    setPostList([newPost, ...postList]);
  };

  return (
    <section className="feed">
      <PostForm onSubmit={onNewPost} />
      <PostList postList={postList} />
    </section>
  );
};

export default Feed;
