import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@nextui-org/react';

import { NotificationContext } from '../../store/notification-context';

import { CommentList } from './CommentList';
import { NewComment } from './NewComment';

export const Comments = props => {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isFetchingComments, setIsFetchingComments] = useState(false);

  const [isLoadingNewComment, setIsLoadingNewComment] = useState(false);

  const notificationCtx = useContext(NotificationContext);

  useEffect(() => {
    if (showComments) {
      setIsFetchingComments(true);
      axios
        .get(`/api/comments/${eventId}`)
        .then(res => {
          setComments(res.data.comments);
          setIsFetchingComments(false);
        })
        .catch(error => {
          notificationCtx.showNotification({
            title: 'Error!',
            message: error.response.data.message || 'Something went wrong!',
            status: 'error',
          });
        });
    }
  }, [showComments]);

  const toggleCommentsHandler = () => {
    setShowComments(prevStatus => !prevStatus);
  };

  const addCommentHandler = commentData => {
    notificationCtx.showNotification({
      title: 'Sending comment...',
      message: 'Your comment is currently being stored into a database.',
      status: 'pending',
    });

    axios
      .post(`/api/comments/${eventId}`, commentData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        notificationCtx.showNotification({
          title: 'Success!',
          message: 'Your comment was saved!',
          status: 'success',
        });
        setShowComments(true);
      })
      .then(res => {
        axios
          .get(`/api/comments/${eventId}`)
          .then(res => {
            setComments(res.data.comments);
          })
          .catch(error => {
            notificationCtx.showNotification({
              title: 'Error!',
              message: error.response.data.message || 'Something went wrong!',
              status: 'error',
            });
          });
      })
      .catch(error => {
        notificationCtx.showNotification({
          title: 'Error!',
          message: error.response.data.message || 'Something went wrong!',
          status: 'error',
        });
      });
  };

  return (
    <section className="max-w-3xl w-4/5 mx-auto my-12 text-center">
      <Button
        className="bg-primary-200 mb-8"
        onClick={toggleCommentsHandler}
        isLoading={isFetchingComments ? true : false}
      >
        {showComments ? 'Hide' : 'Show'} Comments
      </Button>
      {showComments && !isFetchingComments && <CommentList items={comments} />}
      <h1 className="text-2xl font-mono font-normal mt-8">Add comment:</h1>
      <NewComment onAddComment={addCommentHandler} />
    </section>
  );
};
