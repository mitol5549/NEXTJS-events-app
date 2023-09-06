import { EventList } from '../components/events/EventList';

import { getFeaturedEvents } from '../helpers/api-util';

export default function HomePage(props) {
  return (
    <>
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
  };
}
