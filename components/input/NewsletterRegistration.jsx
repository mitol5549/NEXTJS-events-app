import { useRef } from 'react';

import { Input, Button } from '@nextui-org/react';

export const NewsletterRegistration = () => {
  const emailInputRef = useRef();
  function registrationHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;

    fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email: enteredEmail }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(data => console.log(data));
  }

  return (
    <section className="my-12 mx-auto max-w-xs">
      <h2 className="mb-4 text-center">Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className="flex">
          <Input
            type="email"
            id="email"
            label="Email"
            aria-label="Your email"
            size="sm"
            isClearable
            ref={emailInputRef}
          />
          <Button size="lg" type="submit">
            Register
          </Button>
        </div>
      </form>
    </section>
  );
};
