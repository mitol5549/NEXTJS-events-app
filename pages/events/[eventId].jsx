import { useEffect, useState } from 'react';
import Head from 'next/head';
import { getSession } from 'next-auth/react';
import { Progress } from '@nextui-org/react';

import { getFeaturedEvents, getEventById } from '../../helpers/api-util';

import { EventSummary } from '../../components/event-detail/EventSummary';
import { EventLogistics } from '../../components/event-detail/EventLogistics';
import { EventContent } from '../../components/event-detail/EventContent';
import { ErrorAlert } from '../../components/UI/ErrorAlert';
import { Comments } from '../../components/input/Comments';

export default function EventDetailPage(props) {
  const { event } = props;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (event) {
      setIsLoading(false);
    }
  }, [event]);

  useEffect(() => {
    getSession().then(session => {
      if (!session) {
        window.location.href = '/auth';
      } else {
        setIsLoading(false);
      }
    });
  }, []);

  if (isLoading) {
    return <Progress size="lg" color="secondary" label="Loading..." isIndeterminate={true} />;
  }

  if (!event) {
    return (
      <ErrorAlert>
        <p>No Events Found.</p>
      </ErrorAlert>
    );
  }

  return (
    <>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title} />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </>
  );
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId;

  const event = await getEventById(eventId);

  if (!event) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      event,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();

  const paths = events.map(event => ({ params: { eventId: event.id } }));

  return {
    paths,
    fallback: 'blocking',
  };
}
