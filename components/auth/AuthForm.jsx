import { useState } from 'react';

import { Button, Card, Input } from '@nextui-org/react';
import { createUser } from '../../helpers/auth';

import { signIn } from 'next-auth/react';

export const AuthForm = () => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');

  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin(prevState => !prevState);
  };

  const submitHandler = async () => {
    if (isLogin) {
      const result = await signIn('credentials', { redirect: false, email: enteredEmail, password: enteredPassword });
      if (!result.error) {
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
    <Card className="max-w-xl w-4/5 mx-auto my-12 text-center">
      <h1 className="text-2xl font-mono font-normal py-4">{isLogin ? 'Login' : 'Sign Up'}</h1>
      <div className="{classes.control}">
        <label htmlFor="email">Your Email</label>
        <Input type="email" id="email" required value={enteredEmail} onValueChange={setEnteredEmail} />
      </div>
      <div className="{classes.control}">
        <label htmlFor="password">Your Password</label>
        <Input type="password" id="password" required value={enteredPassword} onValueChange={setEnteredPassword} />
      </div>
      <div className="{classes.actions}">
        <Button onClick={submitHandler}>{isLogin ? 'Login' : 'Create Account'}</Button>
        <Button className="{classes.toggle}" onClick={switchAuthModeHandler}>
          {isLogin ? 'Create new account' : 'Login with existing account'}
        </Button>
      </div>
    </Card>
  );
};
