import { Router } from 'express';
import * as post from 'controllers/post';
import * as comment from 'controllers/comment';

const router = Router();

router.get('/', post.getPosts);
router.get('/:id', post.getPost);
router.get('/:id/comments', comment.getComments);

router.post('/', post.addPost);
router.post('/:id/comment', comment.addComment);

router.put('/:id', post.updatePost);
router.put('/:postId/comment/:commentId', comment.updateComment);

router.delete('/:id', post.removePost);
router.put('/:postId/comment/:commentId', comment.removeComment);

export default router;
