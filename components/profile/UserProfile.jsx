import { useEffect, useState } from 'react';
import { ProfileForm } from './ProfileForm';

import classes from './user-profile.module.css';
import { getSession } from 'next-auth/react';

export const UserProfile = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSession().then(session => {
      if (!session) {
        window.location.href = '/auth';
      } else {
        setIsLoading(false);
      }
    });
  }, []);

  if (isLoading) {
    return <p className={classes.profile}>Loading...</p>;
  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
};
