import { useState } from 'react';

import { Button, Card, CardBody, CardFooter, CardHeader, Input } from '@nextui-org/react';
import { createUser } from '../../helpers/auth';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

export const AuthForm = () => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');

  const [isLogin, setIsLogin] = useState(true);

  const router = useRouter();

  const switchAuthModeHandler = () => {
    setIsLogin(prevState => !prevState);
  };

  const submitHandler = async () => {
    if (isLogin) {
      const result = await signIn('credentials', { redirect: false, email: enteredEmail, password: enteredPassword });
      if (!result.error) {
        router.replace('/events');
      }
    } else {
      try {
        const result = await createUser(enteredEmail, enteredPassword);
        console.log(result);
      } catch (error) {
        console.log(error.message);
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
          value={enteredPassword}
          onValueChange={setEnteredPassword}
        />
      </CardBody>
      <CardFooter className="flex-col">
        <Button className="bg-primary-200 mb-4" onClick={submitHandler}>
          {isLogin ? 'Login' : 'Create Account'}
        </Button>
        <Button variant="light" onClick={switchAuthModeHandler}>
          {isLogin ? 'Create new account' : 'Login with existing account'}
        </Button>
      </CardFooter>
    </Card>
  );
};
