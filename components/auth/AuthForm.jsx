import { useContext, useEffect, useState } from 'react';

import { Button, Card, CardBody, CardFooter, CardHeader, Input } from '@nextui-org/react';
import { createUser } from '../../helpers/auth';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { NotificationContext } from '../../store/notification-context';

export const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);

  const regex = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const notificationCtx = useContext(NotificationContext);

  const router = useRouter();

  useEffect(() => {
    if (enteredEmail !== '' && !regex.test(enteredEmail)) {
      setIsEmailInvalid(true);
    } else if (enteredPassword !== '' && enteredPassword.trim().length < 7) {
      setIsPasswordInvalid(true);
    } else {
      setIsEmailInvalid(false);
      setIsPasswordInvalid(false);
    }
  }, [enteredEmail, enteredPassword]);

  const switchAuthModeHandler = () => {
    setIsLogin(prevState => !prevState);
    setEnteredEmail('');
    setEnteredPassword('');
  };

  const submitHandler = async () => {
    setIsLoading(true);

    if (isLogin) {
      if (!regex.test(enteredEmail)) {
        notificationCtx.showNotification({
          title: 'Error!',
          message: 'Invalid email.',
          status: 'error',
        });

        setIsLoading(false);

        return;
      } else if (!enteredPassword || enteredPassword.trim().length < 7) {
        notificationCtx.showNotification({
          title: 'Error!',
          message: 'Password should be at least 7 characters long.',
          status: 'error',
        });

        setIsLoading(false);

        return;
      }

      const result = await signIn('credentials', { redirect: false, email: enteredEmail, password: enteredPassword });

      if (!result.error) {
        router.replace('/events');
      } else {
        notificationCtx.showNotification({
          title: 'Error!',
          message: result.error || 'Something went wrong!',
          status: 'error',
        });

        setIsLoading(false);

        return;
      }
    } else {
      try {
        const result = await createUser(enteredEmail, enteredPassword);

        notificationCtx.showNotification({
          title: 'Success!',
          message: 'Successfully registered new user!',
          status: 'success',
        });

        switchAuthModeHandler();

        setIsLoading(false);
      } catch (error) {
        notificationCtx.showNotification({
          title: 'Error!',
          message: error.response.data.message || 'Something went wrong!',
          status: 'error',
        });

        setIsLoading(false);
      }
    }
  };

  return (
    <Card className="max-w-lg w-4/5 mx-auto mt-12">
      <CardHeader className="mt-4 flex-col">
        <h1 className="text-2xl font-mono font-normal py-4">{isLogin ? 'Login' : 'Sign Up'}</h1>
      </CardHeader>
      <CardBody className="gap-4">
        <Input
          label="Email"
          id="email"
          placeholder="Enter your email"
          type="email"
          size="sm"
          isRequired
          isClearable
          color={isEmailInvalid ? 'danger' : ''}
          isInvalid={isEmailInvalid}
          errorMessage={isEmailInvalid && 'Please enter a valid email.'}
          value={enteredEmail}
          onValueChange={setEnteredEmail}
        />
        <Input
          label="Password"
          id="password"
          placeholder="Enter your password"
          type="password"
          size="sm"
          isRequired
          isClearable
          color={isPasswordInvalid ? 'danger' : ''}
          isInvalid={isPasswordInvalid}
          errorMessage={
            isPasswordInvalid &&
            (isLogin ? 'Please enter a valid password.' : 'Password should be at least 7 characters long.')
          }
          value={enteredPassword}
          onValueChange={setEnteredPassword}
        />
      </CardBody>
      <CardFooter className="flex-col">
        <Button className="bg-primary-200 mb-4" onClick={submitHandler} isLoading={isLoading}>
          {isLogin ? 'Login' : 'Create Account'}
        </Button>
        <Button variant="light" onClick={switchAuthModeHandler}>
          {isLogin ? 'Create new account' : 'Login with existing account'}
        </Button>
      </CardFooter>
    </Card>
  );
};
