import axios from 'axios';

export async function getAllEvents() {
  const response = await axios.get(
    'https://nextjs-course111-default-rtdb.europe-west1.firebasedatabase.app/events.json',
  );

  const data = await response.data;

  const events = [];

  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }

  return events;
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();

  return allEvents.filter(event => event.isFeatured);
}

export async function getFilteredEvents(dateFilter) {
  const allEvents = await getAllEvents();

  const { year, month } = dateFilter;

  let filteredEvents = allEvents.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
  });

  return filteredEvents;
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();

  return allEvents.find(event => event.id === id);
}
