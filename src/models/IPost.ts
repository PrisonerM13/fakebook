'use strict';

export default interface IPost {
  _id: number;
  text: string;
  createdAt: string;
  image?: string;
}
