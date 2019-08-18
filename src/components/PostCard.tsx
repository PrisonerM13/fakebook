import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import IPost from '../models/IPost';
import { imagesBaseURL } from '../services/data.service';
import MenuMoreVertical from './MenuMoreVertical';

interface IProps {
  onDelete: () => void;
}

const PostCard: React.FC<IPost & IProps> = ({
  id,
  text,
  createdAt,
  image,
  onDelete,
}) => {
  const [isEditSelected, setIsEditSelected] = useState(false);

  const onMenuClick = (key: string) => {
    switch (key.toLowerCase()) {
      case 'edit':
        setIsEditSelected(true);
        break;
      case 'delete':
        onDelete();
        break;
      default:
        break;
    }
  };

  if (isEditSelected) {
    return <Redirect push={true} to={`/${id}`} />;
  }

  return (
    <section className="post-card">
      <section className="post-card-header">
        <div className="post-card-date">
          {new Date(createdAt).toLocaleString('default', {
            weekday: 'short',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: false,
          })}
        </div>
        <MenuMoreVertical onItemClick={onMenuClick} />
      </section>
      <header>{text}</header>
      {image && <img src={`${imagesBaseURL}/${image}`} alt={text} />}
    </section>
  );
};

export default PostCard;
