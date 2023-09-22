import { useRef } from 'react';

import { Input, Button } from '@nextui-org/react';
import axios from 'axios';

export const NewsletterRegistration = () => {
  const emailInputRef = useRef();
  function registrationHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;

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
      .then(res => console.log(res.data));
  }

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
