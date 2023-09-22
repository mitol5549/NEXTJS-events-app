import { useEffect, useState } from 'react';

import { CommentList } from './CommentList';
import { NewComment } from './NewComment';

import { Button } from '@nextui-org/react';
import axios from 'axios';

export const Comments = props => {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (showComments) {
      axios.get(`/api/comments/${eventId}`).then(res => {
        setComments(res.data.comments);
      });
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments(prevStatus => !prevStatus);
  }

  function addCommentHandler(commentData) {
    axios
      .post(`/api/comments/${eventId}`, commentData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => console.log(res.data));
  }

  return (
    <section className="max-w-3xl w-4/5 mx-auto my-12 text-center">
      <Button onClick={toggleCommentsHandler}>{showComments ? 'Hide' : 'Show'} Comments</Button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments} />}
    </section>
  );
};
