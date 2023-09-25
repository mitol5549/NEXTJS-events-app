import Image from 'next/image';
import { Card, CardHeader, CardBody, CardFooter, Button, Link } from '@nextui-org/react';

import { DateIcon } from '../icons/DateIcon';
import { AddressIcon } from '../icons/AddressIcon';
import { ArrowRightIcon } from '../icons/ArrowRightIcon';

export const EventItem = props => {
  const { title, image, date, location, id } = props;

  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formattedAddress = location.replace(', ', '\n');

  const exploreLink = `/events/${id}`;

  return (
    <li className="py-4 w-80 md:w-96">
      <Card className="py-4">
        <CardHeader className="pb-0 pt-2 px-auto flex-col item-center">
          <Image
            className="w-1/1 object-cover h-40 md:w-4/5 md:h-56 rounded-lg"
            src={'/' + image}
            alt={title}
            width={250}
            height={160}
            priority={title === 'Networking for introverts' ? true : false}
          />
        </CardHeader>
        <CardBody className="py-6">
          <h4 className="font-bold text-large text-center">{title}</h4>
        </CardBody>
        <CardFooter className="flex flex-col md:flex-row">
          <div className="mr-4">
            <div className="flex items-center gap-2 text-tiny uppercase font-bold pb-2">
              <DateIcon width={20} height={20} />
              <time>{humanReadableDate}</time>
            </div>
            <div className="flex items-start text-sm gap-2 text-default-500">
              <div>
                <AddressIcon width={20} height={20} />
              </div>
              <address>{formattedAddress}</address>
            </div>
          </div>
          <div className="md:w-44 mt-8 justify-center">
            <Button as={Link} href={exploreLink}>
              <span>Explore</span>
              <span className="ml-2 inline-flex justify-center items-center">
                <ArrowRightIcon width={20} height={20} className="fill-primary-200" />
              </span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </li>
  );
};
