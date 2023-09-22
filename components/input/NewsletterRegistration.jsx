import { useContext, useRef } from 'react';

import axios from 'axios';

import { NotificationContext } from '../../store/notification-context';

import { Input, Button } from '@nextui-org/react';

export const NewsletterRegistration = () => {
  const emailInputRef = useRef();

  const notificationCtx = useContext(NotificationContext);

  const registrationHandler = event => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;

    notificationCtx.showNotification({
      title: 'Signing up...',
      message: 'Registering for newsletter.',
      status: 'pending',
    });

    axios
      .post(
        '/api/newsletter',
        { email: enteredEmail },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(res => {
        notificationCtx.showNotification({
          title: 'Success!',
          message: 'Successfully registered for newsletter!',
          status: 'success',
        });
      })
      .catch(error => {
        notificationCtx.showNotification({
          title: 'Error!',
          message: error.message || 'Something went wrong!',
          status: 'error',
        });
      });
  };

  return (
    <section className="my-12 mx-auto max-w-xs">
      <h2 className="mb-4 text-center">Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className="flex gap-4">
          <Input
            type="email"
            id="email"
            label="Email"
            aria-label="Your email"
            size="sm"
            isClearable
            ref={emailInputRef}
          />
          <Button className="bg-primary-200" size="lg" type="submit">
            Register
          </Button>
        </div>
      </form>
    </section>
  );
};
