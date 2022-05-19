import { Request, Response } from 'express';
import PostModel from 'models/post';

export const getPost = async () => {};

export const getPosts = async (req: Request, res: Response) => {
  const { _id: author } = req.user as { _id: string };
  const posts = await PostModel.find({ author })
    .populate('author', 'firstName')
    .populate('likes', 'name');
  res.send(posts);
};

export const addPost = async (req: Request, res: Response) => {
  const { _id: author } = req.user as { _id: string };
  const post = await PostModel.create({ author, ...req.body });
  res.send(post);
};

export const updatePost = async () => {};
export const removePost = async () => {};
export const likePost = async () => {};
