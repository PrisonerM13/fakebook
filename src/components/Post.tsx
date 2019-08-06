import React from "react";
import IPost from "../models/IPost";

const Post: React.FC<IPost> = ({ text, createdAt, imgSrc }) => {
  return (
    <section className="post">
      <div>{text}</div>
      {createdAt && <div>
        {new Date(createdAt).toLocaleDateString("default", {
          day: "numeric",
          month: "short",
          year: "numeric"
        })}
      </div>}
      {imgSrc && <img src={imgSrc} alt={text}/>}
    </section>
  );
};

export default Post;
