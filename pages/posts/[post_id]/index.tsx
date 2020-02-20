import React from 'react';
import PostDetail from '../../../src/views/PostDetail';

const PostDetailPage = ({ post_id }) => <PostDetail postId={post_id} />;

PostDetailPage.getInitialProps = ({ query }) => {
  const { post_id } = query;
  return { post_id };
};

export default PostDetailPage;
