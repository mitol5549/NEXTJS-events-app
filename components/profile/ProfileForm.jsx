import { useState } from 'react';

import { Button, Card, CardBody, CardFooter, CardHeader, Input } from '@nextui-org/react';

export const ProfileForm = props => {
  const [enteredNewPassword, setEnteredNewPassword] = useState('');
  const [enteredOldPassword, setEnteredOldPassword] = useState('');

  const changePasswordHandler = () => {
    props.onChangePassword({
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword,
    });
  };

  return (
    <Card className="max-w-lg w-4/5 mx-auto mt-12">
      <CardHeader className="mt-4 flex-col">
        <h2 className="mb-4 text-center">Here you can change your password</h2>
      </CardHeader>
      <CardBody className="gap-4">
        <Input
          type="password"
          id="new-password"
          label="New Password"
          placeholder="Enter your new password"
          size="sm"
          isRequired
          value={enteredNewPassword}
          onValueChange={setEnteredNewPassword}
        />
        <Input
          type="password"
          id="old-password"
          label="Old Password"
          placeholder="Enter your old password"
          size="sm"
          isRequired
          value={enteredOldPassword}
          onValueChange={setEnteredOldPassword}
        />
      </CardBody>
      <CardFooter className="flex-col mb-4">
        <Button className="bg-primary-200" onClick={changePasswordHandler}>
          Change Password
        </Button>
      </CardFooter>
    </Card>
  );
};
