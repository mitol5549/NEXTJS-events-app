import { Card } from '@nextui-org/react';

export const ErrorAlert = props => {
  return (
    <Card className="text-center mx-auto my-4 px-8 py-4 w-5/6 max-w-2xl font-bold text-2xl">{props.children}</Card>
  );
};
