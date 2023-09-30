import { useState, useEffect } from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Input } from '@nextui-org/react';

import { EyeFilledIcon, EyeSlashFilledIcon } from '../icons/EyeIcon';

export const ProfileForm = props => {
  const [enteredOldPassword, setEnteredOldPassword] = useState('');
  const [enteredNewPassword, setEnteredNewPassword] = useState('');
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');

  const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const [isNewPasswordInvalid, setIsNewPasswordInvalid] = useState(false);

  const { isLoading } = props;

  useEffect(() => {
    if (enteredNewPassword !== '' && enteredNewPassword.trim().length < 7) {
      setIsNewPasswordInvalid(true);
      return;
    }

    setIsNewPasswordInvalid(false);
  }, [enteredNewPassword]);

  const toggleOldPasswordVisibility = () => setIsOldPasswordVisible(!isOldPasswordVisible);
  const toggleNewPasswordVisibility = () => setIsNewPasswordVisible(!isNewPasswordVisible);
  const toggleConfirmPasswordVisibility = () => setIsConfirmPasswordVisible(!isConfirmPasswordVisible);

  const changePasswordHandler = () => {
    props.onChangePassword({
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword,
    });

    setEnteredOldPassword('');
    setEnteredNewPassword('');
    setEnteredConfirmPassword('');
  };

  return (
    <Card className="max-w-lg w-4/5 mx-auto mt-12">
      <CardHeader className="mt-4 flex-col">
        <h2 className="mb-4 text-center">Here you can change your password</h2>
      </CardHeader>
      <CardBody className="gap-4">
        <Input
          type={isOldPasswordVisible ? 'text' : 'password'}
          id="old-password"
          label="Old Password"
          placeholder="Enter your old password"
          size="sm"
          isRequired
          endContent={
            <button className="focus:outline-none" type="button" onClick={toggleOldPasswordVisibility}>
              {isOldPasswordVisible ? (
                <EyeSlashFilledIcon className="text-xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          value={enteredOldPassword}
          onValueChange={setEnteredOldPassword}
        />
        <Input
          label="New Password"
          id="new-password"
          placeholder="Enter your new password"
          size="sm"
          isRequired
          type={isNewPasswordVisible ? 'text' : 'password'}
          endContent={
            <button className="focus:outline-none" type="button" onClick={toggleNewPasswordVisibility}>
              {isNewPasswordVisible ? (
                <EyeSlashFilledIcon className="text-xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          color={isNewPasswordInvalid && 'danger'}
          isInvalid={isNewPasswordInvalid}
          errorMessage={isNewPasswordInvalid && 'Password should be at least 7 characters long.'}
          value={enteredNewPassword}
          onValueChange={setEnteredNewPassword}
        />
        <Input
          type={isConfirmPasswordVisible ? 'text' : 'password'}
          id="confirm-password"
          label="Confirm Password"
          placeholder="Confirm your new password"
          size="sm"
          isRequired
          endContent={
            <button className="focus:outline-none" type="button" onClick={toggleConfirmPasswordVisibility}>
              {isConfirmPasswordVisible ? (
                <EyeSlashFilledIcon className="text-xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          color={enteredConfirmPassword && enteredNewPassword !== enteredConfirmPassword && 'danger'}
          isInvalid={enteredConfirmPassword && enteredNewPassword !== enteredConfirmPassword}
          errorMessage={
            enteredConfirmPassword && enteredNewPassword !== enteredConfirmPassword && 'Passwords do not match'
          }
          value={enteredConfirmPassword}
          onValueChange={setEnteredConfirmPassword}
        />
      </CardBody>
      <CardFooter className="flex-col mb-4">
        <Button
          className="bg-primary-200"
          isLoading={isLoading}
          isDisabled={
            !enteredOldPassword ||
            !enteredNewPassword ||
            isNewPasswordInvalid ||
            enteredNewPassword !== enteredConfirmPassword
          }
          onClick={changePasswordHandler}
        >
          Change Password
        </Button>
      </CardFooter>
    </Card>
  );
};
