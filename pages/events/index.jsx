import { getAllEvents } from '../../dummy-data';

import { EventList } from '../../components/events/EventList';
import { EventsSearch } from '../../components/events/EventsSearch';

const AllEventsPage = () => {
  const events = getAllEvents();

  return (
    <>
      <EventsSearch />
      <EventList events={events} />
    </>
  );
};

export default AllEventsPage;
