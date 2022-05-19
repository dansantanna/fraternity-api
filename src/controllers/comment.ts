import { Request, Response } from 'express';
import CommentModel from 'models/comment';

export const getComments = async () => {};
export const addComment = async (req: Request, res: Response) => {
  const { id: postId } = req.params;
  const { _id: author } = req.user as { _id: string };
  const comment = await CommentModel.create({
    ...req.body,
    author,
    post: postId,
  });
  res.send(comment);
};
export const removeComment = async () => {};
export const updateComment = async () => {};
export const likeComment = async () => {};
