import Head from 'next/head';
import { useRouter } from 'next/router';

import { getAllEvents } from '../../helpers/api-util';

import { EventList } from '../../components/events/EventList';
import { EventsSearch } from '../../components/events/EventsSearch';
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import { Progress } from '@nextui-org/react';

export default function AllEventsPage(props) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSession().then(session => {
      if (!session) {
        window.location.href = '/auth';
      } else {
        setIsLoading(false);
      }
    });
  }, []);

  const router = useRouter();

  const { events } = props;

  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  };

  if (isLoading || !events) {
    return <Progress label="Loading..." color="primary-200" isIndeterminate />;
  }

  return (
    <>
      <Head>
        <title>All events</title>
        <meta name="description" content="Find a lot of great events that allow you to evolve..." />
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList events={events} />
    </>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events,
    },
    revalidate: 60,
  };
}
