import Router from 'next/router';
import { useState } from 'react';

function CommentItem({ comment, increment, decrement, createComment }) {
  const [commentMessage, setCommentMessage] = useState('');
  const marginLevel = comment.level + 1;
  const marginLevelLeft = marginLevel * 20;
  return (
    <>
      <div style={{ marginLeft: marginLevelLeft }}>
        <div className="d-flex flex-row align-items-center">
          <div className="d-flex flex-column mr-3">
            <button
              className="btn btn-dark text-white"
              onClick={() => increment(comment._id)}
            >
              <i className="fa fa-arrow-up"></i>
            </button>
            <h5 className="text-center my-3" style={{ lineHeight: 0 }}>
              {comment.points}
            </h5>
            <button
              className="btn btn-dark text-white"
              onClick={() => decrement(comment._id)}
            >
              <i className="fa fa-arrow-down"></i>
            </button>
          </div>
          <div
            className="card mt-3 d-flex flex-column p-3 flex-grow-1"
            style={{
              minHeight: 150
            }}
          >
            <p className="flex-grow-1">{comment.message}</p>
          </div>
        </div>
        <div
          className="d-flex align-items-center mt-4"
          style={{ marginLeft: marginLevelLeft + 20 }}
        >
          <textarea
            className="form-control mr-3"
            placeholder="Write Comment"
            value={commentMessage}
            onChange={e => setCommentMessage(e.currentTarget.value)}
          ></textarea>
          <button
            onClick={() => {
              createComment(comment._id, commentMessage);
              setCommentMessage('');
            }}
            className="btn btn-primary"
          >
            Post
          </button>
        </div>
        {comment.comments.length > 0 &&
          comment.comments.map(subComment => (
            <CommentItem
              comment={subComment}
              increment={increment}
              decrement={decrement}
              createComment={createComment}
            />
          ))}
      </div>
    </>
  );
}

export default CommentItem;
