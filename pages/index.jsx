import Head from 'next/head';
import { useRouter } from 'next/router';

import { getFeaturedEvents } from '../helpers/api-util';

import { EventList } from '../components/events/EventList';
import { NewsletterRegistration } from '../components/input/NewsletterRegistration';

export default function HomePage(props) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Next Events</title>
        <meta name="description" content="Find a lot of great events that allow you to evolve..." />
      </Head>
      <NewsletterRegistration />
      <h1 className="text-center text-4xl font-mono font-normal py-12">Featured Events</h1>
      <EventList events={props.featuredEvents} isCarousel={router.asPath} />
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
