import { createContext, useEffect, useState } from 'react';

export const NotificationContext = createContext({
  notification: null,
  showNotification: function (notificationData) {},
  hideNotification: function () {},
});

export const NotificationContextProvider = props => {
  const [activeNotification, setActiveNotification] = useState();

  useEffect(() => {
    if (activeNotification && (activeNotification.status === 'success' || activeNotification.status === 'error')) {
      const timer = setTimeout(() => {
        hideNotificationHandler();
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

  const showNotificationHandler = notificationData => {
    setActiveNotification(notificationData);
  };

  const hideNotificationHandler = () => {
    setActiveNotification(null);
  };

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return <NotificationContext.Provider value={context}>{props.children}</NotificationContext.Provider>;
};
