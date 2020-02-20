import useCheckLogin from '../hooks/useCheckLogin';
import Navbar from '../components/Navbar';
import swal from 'sweetalert';
import { useCallback, useState, useEffect } from 'react';
import getErrorMessage from '../utils/getErrorMessage';
import Services from '../services/services';
import PostList from '../components/PostList';

export default function HomePage() {
  useCheckLogin();
  const [message, setMessage] = useState();
  const [posts, setPosts] = useState([]);
  const getPosts = useCallback(() => {
    async function getPosts() {
      try {
        const services = new Services();
        const { data } = await services.getAllPost();
        setPosts(data);
      } catch (error) {}
    }
    getPosts();
  }, []);
  useEffect(() => {
    getPosts();
  }, []);
  const upsert = useCallback(
    async (postId: string, type: 'increment' | 'decrement') => {
      try {
        const services = new Services();
        await services.upsertPoints(postId, type);
        getPosts();
      } catch (error) {
        swal('Error', getErrorMessage(error), 'error');
      }
    },
    []
  );
  const increment = useCallback(
    (postId: string) => upsert(postId, 'increment'),
    []
  );
  const decrement = useCallback(
    (postId: string) => upsert(postId, 'decrement'),
    []
  );
  const onPost = useCallback(async () => {
    try {
      const services = new Services();
      const response = await services.post(message);
      swal('Success', 'Berhasil membuat post', 'success');
      setMessage('');
      getPosts();
    } catch (err) {
      swal('Error', getErrorMessage(err), 'error');
    }
  }, [message]);
  return (
    <div>
      <Navbar isLogin />
      <div className="d-flex flex-column p-4">
        <div className="d-flex flex-column">
          <textarea
            value={message}
            onChange={e => setMessage(e.currentTarget.value)}
            className="form-control"
            placeholder="Tulis Postingan"
          />
          <button
            onClick={onPost}
            className="btn btn-primary align-self-end mt-2"
          >
            Post
          </button>
          <PostList posts={posts} increment={increment} decrement={decrement} />
        </div>
      </div>
    </div>
  );
}
