import { getAllEvents } from '../../dummy-data';

import { EventList } from '../../components/events/EventList';

const AllEventsPage = () => {
  const events = getAllEvents();

  return (
    <>
      <EventList events={events} />
    </>
  );
};

export default AllEventsPage;
