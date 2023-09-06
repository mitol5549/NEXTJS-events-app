import { getAllEvents, getEventById } from '../../helpers/api-util';

import { EventSummary } from '../../components/event-detail/EventSummary';
import { EventLogistics } from '../../components/event-detail/EventLogistics';
import { EventContent } from '../../components/event-detail/EventContent';
import { ErrorAlert } from '../../components/ui/ErrorAlert';

export default function EventDetailPage(props) {
  const { event } = props;

  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title} />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
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
  };
}

export async function getStaticPaths() {
  const events = await getAllEvents();

  const paths = events.map(event => ({ params: { eventId: event.id } }));

  return {
    paths,
    fallback: 'blocking',
  };
}
