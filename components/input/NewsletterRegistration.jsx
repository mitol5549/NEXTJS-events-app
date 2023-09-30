import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Input, Button } from '@nextui-org/react';

import { NotificationContext } from '../../store/notification-context';

export const NewsletterRegistration = () => {
  const [isInvalid, setIsInvalid] = useState(false);
  const [enteredEmail, setInteredEmail] = useState('');

  const notificationCtx = useContext(NotificationContext);

  const regex = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  useEffect(() => {
    if (enteredEmail !== '' && !regex.test(enteredEmail)) {
      setIsInvalid(true);
    } else {
      setIsInvalid(false);
    }
  }, [enteredEmail]);

  const registrationHandler = () => {
    if (!regex.test(enteredEmail)) {
      setIsInvalid(true);
      return;
    }

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
          message: error.response.data.message || 'Something went wrong!',
          status: 'error',
        });
      });
  };

  return (
    <section className="my-12 mx-auto max-w-xs">
      <h2 className="mb-4 text-center">Sign up to stay updated!</h2>
      <div className="flex gap-4">
        <Input
          type="email"
          label="Email"
          aria-label="Your email"
          placeholder="Enter your email"
          size="sm"
          isClearable
          color={isInvalid ? 'danger' : ''}
          value={enteredEmail}
          isInvalid={isInvalid}
          errorMessage={isInvalid && 'Please enter a valid email.'}
          onValueChange={setInteredEmail}
        />
        <Button className="bg-primary-200" size="lg" type="submit" onClick={registrationHandler}>
          Subscribe
        </Button>
      </div>
    </section>
  );
};
