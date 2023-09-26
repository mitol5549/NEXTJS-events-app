import axios from 'axios';
import { hash } from 'bcryptjs';

export const hashPassword = async password => {
  const hashedPassword = await hash(password, 12);

  return hashedPassword;
};

export const createUser = async (email, password) => {
  const response = await axios.post(
    '/api/auth/signup',
    { email, password },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  const data = await response.data;

  return data;
};
