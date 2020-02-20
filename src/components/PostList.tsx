import FontawesomeIncluder from './FontawesomeIncluder';
import { useCallback } from 'react';
import swal from 'sweetalert';
import Services from '../services/services';
import getErrorMessage from '../utils/getErrorMessage';
import PostItem from './PostItem';

type Props = {
  posts: any[];
  increment: Function;
  decrement: Function;
};

function PostList({ posts, increment, decrement }: Props) {
  return (
    <>
      <FontawesomeIncluder />
      {posts.map((post: any) => (
        <PostItem post={post} increment={increment} decrement={decrement} />
      ))}
    </>
  );
}

export default PostList;
