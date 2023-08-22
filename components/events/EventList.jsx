import { EventItem } from './EventItem';

export const EventList = props => {
  const { events } = props;

  return (
    <ul>
      {events.map(event => (
        <EventItem
          key={event.id}
          id={event.id}
          title={event.title}
          location={event.location}
          date={event.date}
          image={event.image}
        />
      ))}
    </ul>
  );
};
