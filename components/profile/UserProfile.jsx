import { useContext, useState } from 'react';

// import { getSession } from 'next-auth/react';

import axios from 'axios';

import { ProfileForm } from './ProfileForm';
import { NotificationContext } from '../../store/notification-context';

export const UserProfile = props => {
  const [isLoading, setIsLoading] = useState(false);

  const userEmail = props.email;

  const notificationCtx = useContext(NotificationContext);

  // useEffect(() => {
  //   getSession().then(session => {
  //     if (!session) {
  //       window.location.href = '/auth';
  //     } else {
  //       setIsLoading(false)
  //     }
  //   });
  // }, []);

  // if (isLoading) {
  //   return <p className={classes.profile}>Loading...</p>;
  // }

  const changePasswordHandler = async passwordData => {
    setIsLoading(true);

    try {
      const response = await axios.patch('/api/user/change-password', passwordData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setIsLoading(false);

      notificationCtx.showNotification({
        title: 'Success!',
        message: 'Successfully changed password!',
        status: 'success',
      });
    } catch (error) {
      setIsLoading(false);

      notificationCtx.showNotification({
        title: 'Error!',
        message: error.response.data.message || 'Something went wrong!',
        status: 'error',
      });
    }
  };

  return (
    <>
      <h1 className="text-center text-4xl font-mono font-normal py-12">Hallo, {userEmail}</h1>
      <ProfileForm isLoading={isLoading} onChangePassword={changePasswordHandler} />
    </>
  );
};
