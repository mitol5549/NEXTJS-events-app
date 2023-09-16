import { Button, Link } from '@nextui-org/react';

export const ResultsTitle = props => {
  const { date } = props;

  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <section className="my-8 mx-auto w-5/6 max-w-2xl text-center">
      <h1 className="text-center text-4xl font-mono font-normal py-12">Events in {humanReadableDate}</h1>
      <Button as={Link} href="/events">
        Show all events
      </Button>
    </section>
  );
};
