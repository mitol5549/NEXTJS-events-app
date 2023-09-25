import { useContext } from 'react';

import { NotificationContext } from '../../store/notification-context';

import { MainHeader } from './MainHeader';
import { Notification } from '../UI/Notification';

export const Layout = props => {
  const notificationCtx = useContext(NotificationContext);

  const activeNotification = notificationCtx.notification;

  return (
    <>
      <MainHeader />
      <main>{props.children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </>
  );
};
