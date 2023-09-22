import { Carousel } from '../ui/Carousel';

import { EventItem } from './EventItem';

export const EventList = props => {
  const { events, isCarousel } = props;

  if (isCarousel) {
    return (
      <div className="relative w-full 2xl:max-w-10xl">
        <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-background to-transparent z-10" />
        <ul className="justify-center w-full my-5 mx-auto">
          <Carousel>
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
          </Carousel>
        </ul>
      </div>
    );
  } else {
    return (
      <ul className="w-5/6 2xl:max-w-7xl max-w-4xl grid 2xl:grid-cols-3 lg:grid-cols-2 gap-8 justify-center justify-items-center my-5 mx-auto">
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
  }
};
