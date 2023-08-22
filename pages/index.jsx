import { EventList } from '../components/events/EventList';
import { getFeaturedEvents } from '../dummy-data';

const HomePage = () => {
  const featuredEvents = getFeaturedEvents();

  return (
    <>
      <EventList events={featuredEvents} />
    </>
  );
};

export default HomePage;
