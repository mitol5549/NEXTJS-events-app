import { useContext } from 'react';

import { NotificationContext } from '../../store/notification-context';
import { Card } from '@nextui-org/react';

export const Notification = props => {
  const notificationCtx = useContext(NotificationContext);

  const { title, message, status } = props;

  let statusClasses = '';

  if (status === 'success') {
    statusClasses = 'bg-success text-white';
  }

  if (status === 'error') {
    statusClasses = 'bg-danger text-white';
  }

  if (status === 'pending') {
    statusClasses = 'bg-primary-200 text-default-foreground';
  }

  const activeClasses = `fixed bottom-8 left-0 sm:left-1/4 flex justify-around items-center w-full sm:w-1/2 h-20 opacity-90 z-50 ${statusClasses}`;

  return (
    <Card className={activeClasses} onClick={notificationCtx.hideNotification}>
      <h2 className="text-xl">{title}</h2>
      <p>{message}</p>
    </Card>
  );
};
