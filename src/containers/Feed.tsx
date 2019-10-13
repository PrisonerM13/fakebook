import React, { useEffect, useState } from 'react';
import { dataService } from '../App';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import IPost from '../models/IPost';
import IPostList from '../models/IPostList';

const Feed: React.FC = () => {
  const [postList, setPostList] = useState<IPostList>({});
  useEffect(() => {
    const getData = async () => {
      const posts = await dataService.getAll();
      const list: IPostList = {};
      posts.forEach(post => list[post._id] = post);
      setPostList(list);
    };
    getData();
  }, []);

  const onNewPost = (newPost: IPost) => {
    setPostList({ [newPost._id]: newPost, ...postList });
  };

  const onPostDelete = async (id: number) => {
    await dataService.remove(id);
    delete postList[id];
    setPostList({ ...postList });
  };

  return (
    <section className="feed">
      <PostForm onSubmit={onNewPost} />
      <PostList postList={postList} onPostDelete={onPostDelete} />
    </section>
  );
};

export default Feed;
