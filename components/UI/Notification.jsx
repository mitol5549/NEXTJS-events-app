import { useContext } from 'react';

import { NotificationContext } from '../../store/notification-context';

export const Notification = props => {
  const notificationCtx = useContext(NotificationContext);

  const { title, message, status } = props;

  let statusClasses = '';

  if (status === 'success') {
    statusClasses = 'bg-success';
  }

  if (status === 'error') {
    statusClasses = 'bg-danger';
  }

  if (status === 'pending') {
    statusClasses = 'bg-primary';
  }

  const activeClasses = `fixed bottom-0 left-0 flex justify-around items-center w-full h-20 text-white ${statusClasses}`;

  return (
    <div className={activeClasses} onClick={notificationCtx.hideNotification}>
      <h2 className="text-xl">{title}</h2>
      <p>{message}</p>
    </div>
  );
};
