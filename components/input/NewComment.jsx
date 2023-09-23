import { useState } from 'react';

import { Button, Card, Input, Textarea } from '@nextui-org/react';

export const NewComment = props => {
  const [isInvalid, setIsInvalid] = useState(false);

  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredName, setEnteredName] = useState('');
  const [enteredComment, setEnteredComment] = useState('');

  const sendCommentHandler = () => {
    if (
      !enteredEmail ||
      enteredEmail.trim() === '' ||
      !enteredEmail.includes('@') ||
      !enteredName ||
      enteredName.trim() === '' ||
      !enteredComment ||
      enteredComment.trim() === ''
    ) {
      setIsInvalid(true);
      return;
    }

    props.onAddComment({
      email: enteredEmail,
      name: enteredName,
      text: enteredComment,
    });

    setEnteredEmail('');
    setEnteredName('');
    setEnteredComment('');
  };

  return (
    <Card className="my-8 p-4 ">
      <div className="flex flex-wrap gap-4">
        <div className="grow mb-2 text-left">
          <Input
            className="p-1"
            id="email"
            label="Email"
            labelPlacement="outside"
            placeholder="Enter your email"
            value={enteredEmail}
            onValueChange={setEnteredEmail}
            isRequired
          />
        </div>
        <div className="grow mb-2 text-left">
          <Input
            className="p-1"
            id="name"
            label="Name"
            labelPlacement="outside"
            placeholder="Enter your name"
            value={enteredName}
            onValueChange={setEnteredName}
            isRequired
          />
        </div>
      </div>
      <div className="grow mb-2 text-left">
        <Textarea
          label="Comment"
          labelPlacement="outside"
          minRows={5}
          id="comment"
          placeholder="Please enter your comment"
          isRequired
          value={enteredComment}
          onValueChange={setEnteredComment}
        ></Textarea>
      </div>
      {isInvalid && <p>Please enter a valid email address and comment!</p>}
      <Button className="w-32 self-center bg-primary-200" onClick={sendCommentHandler}>
        Submit
      </Button>
    </Card>
  );
};
