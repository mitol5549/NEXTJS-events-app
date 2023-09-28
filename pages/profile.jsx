import { getSession } from 'next-auth/react';

import { UserProfile } from '../components/profile/UserProfile';

export default function ProfilePage(props) {
  return <UserProfile email={props.email} />;
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return {
    props: { session, email: session.user.email },
  };
}
