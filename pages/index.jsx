import Head from 'next/head';

import { getFeaturedEvents } from '../helpers/api-util';

import { EventList } from '../components/events/EventList';
import { NewsletterRegistration } from '../components/input/NewsletterRegistration';

export default function HomePage(props) {
  return (
    <>
      <Head>
        <title>Next Events</title>
        <meta name="description" content="Find a lot of great events that allow you to evolve..." />
      </Head>
      <NewsletterRegistration />
      <EventList events={props.featuredEvents} />
    </>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      featuredEvents,
    },
    revalidate: 1800,
  };
}
