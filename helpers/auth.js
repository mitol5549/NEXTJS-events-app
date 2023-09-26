import axios from 'axios';
import { compare, hash } from 'bcryptjs';

export const hashPassword = async password => {
  const hashedPassword = await hash(password, 12);

  return hashedPassword;
};

export const verifyPassword = async (password, hashedPassword) => {
  const isValid = await compare(password, hashedPassword);

  return isValid;
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
