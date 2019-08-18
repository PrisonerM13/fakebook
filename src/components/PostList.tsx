import React from 'react';
import IPost from '../models/IPost';
import Loading from './Loading';
import PostCard from './PostCard';

interface IProps {
  postList: IPost[];
  onPostDelete: (index: number) => void;
}

const PostList: React.FC<IProps> = ({ postList, onPostDelete }) => {
  if (!postList) {
    return <Loading />;
  }

  return (
    <section className="post-list">
      {postList.map((post, index) => (
        <PostCard key={post.id} onDelete={onPostDelete.bind(null, index)} {...post} />
      ))}
    </section>
  );
};

export default PostList;
