import React from 'react';
import IPostList from '../models/IPostList';
import Loading from './Loading';
import PostCard from './PostCard';

interface IProps {
  postList: IPostList;
  onPostDelete: (id: number) => void;
}

const PostList: React.FC<IProps> = ({ postList, onPostDelete }) => {
  if (!postList) {
    return <Loading />;
  }

  return (
    <section className="post-list">
      {Object.values(postList).reverse().map(post => (
        <PostCard key={post._id} onDelete={onPostDelete.bind(null, post._id)} {...post} />
      ))}
    </section>
  );
};

export default PostList;
