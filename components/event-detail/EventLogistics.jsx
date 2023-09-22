import Image from 'next/image';

import { LogisticsItem } from './LogisticsItem';

import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { AddressIcon } from '../icons/AddressIcon';
import { DateIcon } from '../icons/DateIcon';

export const EventLogistics = props => {
  const { date, address, image, imageAlt } = props;

  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const addressText = address.replace(', ', '\n');

  return (
    <>
      <Card className="flex flex-col items-center justify-between gap-4 p-8 max-w-3xl w-4/5 mx-auto -my-12 md:-my-20 md:gap-12 md:justify-center md:flex-row md:items-stretch">
        <CardHeader className="w-40 h-40 rounded-full border-5 p-0 overflow-hidden md:w-80 md:h-80">
          <Image
            className="w-40 h-40 object-cover md:w-80 md:h-80"
            src={`/${image}`}
            alt={imageAlt}
            width={400}
            height={400}
            priority={true}
          />
        </CardHeader>
        <CardBody>
          <ul className="flex grow gap-8 flex-col justify-center items-center md:items-start">
            <LogisticsItem icon={DateIcon}>
              <time>{humanReadableDate}</time>
            </LogisticsItem>
            <LogisticsItem icon={AddressIcon}>
              <address className="whitespace-pre">{addressText}</address>
            </LogisticsItem>
          </ul>
        </CardBody>
      </Card>
    </>
  );
};
