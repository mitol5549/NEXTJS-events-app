// import { useEffect, useState } from 'react';

// import { getSession } from 'next-auth/react';

import axios from 'axios';

import { ProfileForm } from './ProfileForm';

export const UserProfile = props => {
  // const [isLoading, setIsLoading] = useState(true);

  const userEmail = props.email;

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
    const response = await axios.patch('/api/user/change-password', passwordData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.data;

    console.log(data);
  };

  return (
    <>
      <h1 className="text-center text-4xl font-mono font-normal py-12">Hallo, {userEmail}</h1>
      <ProfileForm onChangePassword={changePasswordHandler} />
    </>
  );
};
