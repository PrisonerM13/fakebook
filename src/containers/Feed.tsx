import React, { useEffect, useState } from 'react';
import { dataService } from '../App';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import IPost from '../models/IPost';

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

  const onPostDelete = async (index: number) => {
    await dataService.remove(postList[index].id);
    setPostList([...postList.slice(0, index), ...postList.slice(index + 1)]);
  };

  return (
    <section className="feed">
      <PostForm onSubmit={onNewPost} />
      <PostList postList={postList} onPostDelete={onPostDelete} />
    </section>
  );
};

export default Feed;
