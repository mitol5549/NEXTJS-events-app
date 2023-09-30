import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Progress } from '@nextui-org/react';

import { AuthForm } from '../components/auth/AuthForm';

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    getSession().then(session => {
      if (session) {
        router.replace('/events');
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  if (isLoading) {
    return <Progress label="Loading..." className="bg-primary-200" isIndeterminate />;
  }

  return <AuthForm />;
}
