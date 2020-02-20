import Router from 'next/router';

function PostItem({ post, increment, decrement }) {
  return (
    <div className="d-flex flex-row align-items-center">
      <div className="d-flex flex-column mr-3">
        <button
          className="btn btn-dark text-white"
          onClick={() => increment(post._id)}
        >
          <i className="fa fa-arrow-up"></i>
        </button>
        <h5 className="text-center my-3" style={{ lineHeight: 0 }}>
          {post.points}
        </h5>
        <button
          className="btn btn-dark text-white"
          onClick={() => decrement(post._id)}
        >
          <i className="fa fa-arrow-down"></i>
        </button>
      </div>
      <div
        onClick={() => Router.push(`/posts/${post._id}`)}
        className="card mt-3 d-flex flex-column p-3 flex-grow-1"
        style={{
          minHeight: 150
        }}
      >
        <p className="flex-grow-1">{post.content}</p>
        <div>
          <a href={`/posts/${post._id}`}>
            {`${post.comments.length} Comments`}
          </a>
        </div>
      </div>
    </div>
  );
}

export default PostItem;
