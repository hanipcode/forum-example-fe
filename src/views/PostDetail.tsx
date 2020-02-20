import { useCallback, useState, useEffect } from 'react';
import Services from '../services/services';
import swal from 'sweetalert';
import getErrorMessage from '../utils/getErrorMessage';
import Navbar from '../components/Navbar';
import PostItem from '../components/PostItem';
import FontawesomeIncluder from '../components/FontawesomeIncluder';
import CommentItem from '../components/CommentItem';

function PostDetail({ postId }) {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentMessage, setCommentMessage] = useState('');

  const getPost = useCallback(async () => {
    try {
      const services = new Services();
      const { data } = await services.getPostDetail(postId);
      setPost(data);
    } catch (error) {}
  }, []);
  const getComment = useCallback(async () => {
    try {
      const services = new Services();
      const { data } = await services.getComments(postId);
      setComments(data);
    } catch (error) {}
  }, []);

  const upsert = useCallback(
    async (postId: string, type: 'increment' | 'decrement') => {
      try {
        const services = new Services();
        await services.upsertPoints(postId, type);
        getPost();
      } catch (error) {
        swal('Error', getErrorMessage(error), 'error');
      }
    },
    []
  );
  const upsertComment = useCallback(
    async (
      postId: string,
      commentId: string,
      type: 'increment' | 'decrement'
    ) => {
      try {
        const services = new Services();
        await services.upsertCommentPoints(postId, commentId, type);
        getComment();
      } catch (error) {
        swal('Error', getErrorMessage(error), 'error');
      }
    },
    []
  );
  const increment = useCallback(() => upsert(postId, 'increment'), []);
  const decrement = useCallback(() => upsert(postId, 'decrement'), []);
  const incrementComment = useCallback(
    (commentId: string) => upsertComment(postId, commentId, 'increment'),
    []
  );
  const decrementComment = useCallback(
    (commentId: string) => upsertComment(postId, commentId, 'decrement'),
    []
  );
  const createComment = useCallback(async () => {
    try {
      const services = new Services();
      await services.postComment(postId, commentMessage);
      setCommentMessage('');
      getComment();
    } catch (error) {
      swal('Error', getErrorMessage(error), 'error');
    }
  }, [commentMessage]);

  const createSubComment = useCallback(
    async (commentId: string, message: string) => {
      try {
        const services = new Services();
        await services.postSubComment(postId, commentId, message);
        getComment();
      } catch (error) {
        swal('Error', getErrorMessage(error), 'error');
      }
    },
    []
  );

  useEffect(() => {
    getPost();
    getComment();
  }, []);
  return (
    <div>
      <FontawesomeIncluder />
      <Navbar isLogin />
      <div className="p-4">
        {post && (
          <PostItem post={post} increment={increment} decrement={decrement} />
        )}
        <div>
          {comments.map(comment => (
            <CommentItem
              createComment={createSubComment}
              comment={comment}
              increment={incrementComment}
              decrement={decrementComment}
            />
          ))}
        </div>
        <div className="d-flex align-items-center mt-4">
          <textarea
            className="form-control mr-3"
            placeholder="Write Comment"
            value={commentMessage}
            onChange={e => setCommentMessage(e.currentTarget.value)}
          ></textarea>
          <button onClick={createComment} className="btn btn-primary">
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
