import { Input, Button } from '@nextui-org/react';
import classes from './newsletter-registration.module.css';

export const NewsletterRegistration = () => {
  function registrationHandler(event) {
    event.preventDefault();

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
  }

  return (
    <section className='my-12 mx-auto max-w-xs'>
      <h2 className="mb-4 text-center">Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className='flex'>
        <Input type="email" id="email" label="Email" aria-label="Your email" size="sm" isClearable />
        <Button size="lg">Register</Button>
        </div>
      </form>
    </section>
  );
};
